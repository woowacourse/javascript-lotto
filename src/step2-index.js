import WebLottoController from './controllers/WebLottoController.js';
import webInputView from './views/webInputView.js';

const PURCHASE_FORM = document.getElementById('purchaseForm');
const PURCHASE_BTN = document.getElementById('purchaseButton');

const handlePurchaseBtn = () => {
  const purchaseAmount = webInputView.readPurchaseAmount();
  const lottoController = new WebLottoController(purchaseAmount);
  lottoController.run();
};

const handleFormSubmit = e => {
  e.preventDefault();
};

PURCHASE_FORM.addEventListener('submit', handleFormSubmit);
PURCHASE_BTN.addEventListener('click', handlePurchaseBtn);
