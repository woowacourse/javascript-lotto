import LottoController from './js/controller/LottoController.js';
import './css/index.css';
import LottoVendor from './js/model/LottoVendor.js';
import PurchaseView from './js/view/PurchaseView.js';
import IssuedTicketView from './js/view/IssuedTicketView.js';
import LottoResult from './js/model/LottoResult.js';
import WinningNumbersView from './js/view/WinningNumbersView.js';
import ResultModalView from './js/view/ResultModalView.js';

window.addEventListener('DOMContentLoaded', () => {
  const lottoVendor = new LottoVendor();
  const lottoResult = new LottoResult(lottoVendor);
  const purchaseView = new PurchaseView(lottoVendor);
  const issuedTicketView = new IssuedTicketView(lottoVendor);
  const winningNumbersView = new WinningNumbersView(lottoResult);
  const resultModalView = new ResultModalView(lottoVendor);
  const controller = new LottoController(
    lottoVendor,
    purchaseView,
    issuedTicketView,
    lottoResult,
    winningNumbersView,
    resultModalView,
  );
});
