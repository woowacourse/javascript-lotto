import LottoController from './js/controller/LottoController.js';
import './css/index.css';
import LottoBundle from './js/model/LottoBundle.js';
import PurchaseView from './js/view/PurchaseView.js';
import IssuedTicketView from './js/view/IssuedTicketView.js';
import LottoResult from './js/model/LottoResult.js';
import WinningNumbersView from './js/view/WinningNumbersView.js';
import ResultModalView from './js/view/ResultModalView.js';

window.addEventListener('DOMContentLoaded', () => {
  const lottoBundle = new LottoBundle();
  const lottoResult = new LottoResult(lottoBundle);
  const purchaseView = new PurchaseView(lottoBundle);
  const issuedTicketView = new IssuedTicketView(lottoBundle);
  const winningNumbersView = new WinningNumbersView(lottoResult);
  const resultModalView = new ResultModalView();
  const controller = new LottoController(
    lottoBundle,
    purchaseView,
    issuedTicketView,
    lottoResult,
    winningNumbersView,
    resultModalView,
  );
});
