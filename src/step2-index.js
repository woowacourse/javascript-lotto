import WebLottoController from './controllers/WebLottoController.js';
import webInputView from './views/webInputView.js';

const $purchaseForm = document.getElementById('purchaseForm');
const $purchaseBtn = document.getElementById('purchaseButton');
const $winningNumberInput = document.getElementById('winningNumberInput');

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

$purchaseForm.addEventListener('submit', handleFormSubmit);
$purchaseBtn.addEventListener('click', handlePurchaseBtn);
