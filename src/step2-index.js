import WebLottoController from './controllers/WebLottoController.js';
import modal from './utils/dom/modal.js';
import webInputView from './views/webInputView.js';

const $purchaseForm = document.getElementById('purchaseForm');
const $purchaseBtn = document.getElementById('purchaseButton');
const $winningNumberInput = document.getElementById('winningNumberInput');
const $closeBtn = document.getElementById('closeButton');

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

$purchaseForm.addEventListener('submit', handleFormSubmit);
$purchaseBtn.addEventListener('click', handlePurchaseBtn);
$closeBtn.addEventListener('click', handleCloseModal);
