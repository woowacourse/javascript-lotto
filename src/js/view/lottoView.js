import { SELECTOR } from '../constants/constants';
import { selectDom } from '../utils/utils';
import CashInputView from './cashInputView';
import PurchasedLottoView from './purchasedLottoView';
import ResultModalView from './resultModalView';
import WinnerNumberView from './winnerNumberView';

class LottoView {
  constructor() {
    this.cashInputView = new CashInputView();
    this.purchasedLottoView = new PurchasedLottoView();
    this.winnerNumberView = new WinnerNumberView();
    this.resultModalView = new ResultModalView();

    this.#attachEventListeners();

    this.sendRequest = () => {};
  }

  addRequestHandler(sendRequest) {
    this.sendRequest = sendRequest;
    this.cashInputView.addRequestHandler(sendRequest);
    this.winnerNumberView.addRequestHandler(sendRequest);
  }

  #attachEventListeners() {
    selectDom(SELECTOR.CASH_INPUT_BUTTON_CLASS).addEventListener('click', this.#handleCashInput);
    selectDom('.result-button').addEventListener('click', this.#handleWinnerNumberInput);
    selectDom('.restart-button').addEventListener('click', this.#handleRestart);
  }

  #handleCashInput = () => {
    try {
      const lottoArray = this.cashInputView.handleCashInput();
      this.#renderLottos(lottoArray);
    } catch (e) {
      alert(e.message);
    }
  };

  #handleWinnerNumberInput = () => {
    try {
      const matchResult = this.winnerNumberView.handleWinnerNumberInput();
      this.#renderResultModal(matchResult);
    } catch (e) {
      alert(e.message);
    }
  };

  #handleRestart = () => {
    this.#resetView();
    this.sendRequest('RESTART_APP');
  };

  #resetView = () => {
    this.cashInputView.resetView();
    this.purchasedLottoView.resetView();
    this.winnerNumberView.resetView();
    this.resultModalView.resetView();
  };

  #renderLottos(lottoArray) {
    this.cashInputView.disableCashInput();
    this.purchasedLottoView.renderLottos(lottoArray);
    this.winnerNumberView.render();
  }

  #renderResultModal(matchResult) {
    this.resultModalView.renderResultModal(matchResult);
  }
}
export default LottoView;
