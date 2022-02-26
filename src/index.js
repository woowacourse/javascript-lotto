import LottoController from './js/controller/LottoController.js';
import './css/index.css';
import LottoBundle from './js/model/LottoBundle.js';
import PurchaseView from './js/view/PurchaseView.js';
import IssuedTicketView from './js/view/IssuedTicketView.js';

window.addEventListener('DOMContentLoaded', () => {
  const model = new LottoBundle();
  const purchaseView = new PurchaseView(model);
  const issuedTicketView = new IssuedTicketView(model);
  const controller = new LottoController(model, purchaseView, issuedTicketView);
});
