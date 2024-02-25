import WebLottoController from './controllers/WebLottoController.js';
import webInputView from './views/webInputView.js';

const $purchaseForm = document.getElementById('purchaseForm');
const $purchaseBtn = document.getElementById('purchaseButton');

const handlePurchaseBtn = () => {
  const purchaseAmount = webInputView.readPurchaseAmount();
  if (!purchaseAmount) return;
  const lottoController = new WebLottoController(purchaseAmount);
  lottoController.run();
};

const handleFormSubmit = e => {
  e.preventDefault();
};

$purchaseForm.addEventListener('submit', handleFormSubmit);
$purchaseBtn.addEventListener('click', handlePurchaseBtn);
