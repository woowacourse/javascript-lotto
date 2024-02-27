import WebLottoController from './controllers/WebLottoController.js';
import eventHandler from './utils/dom/eventHandler.js';
import modal from './utils/dom/modal.js';
import webInputView from './views/webInputView.js';

const $purchaseForm = document.getElementById('purchaseForm');
const $purchaseBtn = document.getElementById('purchaseButton');
const $winningNumberInput = document.querySelector('.winningNumberInput');
const $closeBtn = document.getElementById('closeButton');
const $restartBtn = document.getElementById('restartButton');

const app = {
  play() {
    const purchaseAmount = webInputView.readPurchaseAmount();
    if (!purchaseAmount) return;
    $winningNumberInput.focus();
    const lottoController = new WebLottoController(purchaseAmount);
    lottoController.run();
  },
};

const handlePurchaseBtn = () => {
  app.play();
};

const handleFormSubmit = e => {
  e.preventDefault();
};

const handleCloseModal = () => {
  modal.close();
};

const handleClickRestart = () => {
  modal.close();
  eventHandler.restart();
};

const handleClickOuterModal = e => {
  if (e.target.id === 'modalBackground') modal.close();
};

$purchaseForm.addEventListener('submit', handleFormSubmit);
$purchaseBtn.addEventListener('click', handlePurchaseBtn);
$closeBtn.addEventListener('click', handleCloseModal);
$restartBtn.addEventListener('click', handleClickRestart);
document.body.addEventListener('click', handleClickOuterModal);
