import { REQUEST_MESSAGE, SELECTOR } from '../constants/constants';
import { selectDom } from '../utils/utils';
import CashInputView from './cashInputView';
import PurchasedLottoView from './purchasedLottoView';
import ResultModalView from './resultModalView';
import WinnerNumberInputView from './winnerNumberInputView';

class LottoView {
  constructor() {
    this.cashInputView = new CashInputView();
    this.purchasedLottoView = new PurchasedLottoView();
    this.winnerNumberInputView = new WinnerNumberInputView();
    this.resultModalView = new ResultModalView();

    this.#attachEventListeners();

    this.sendRequest = () => {};
  }

  addRequestHandler(sendRequest) {
    this.sendRequest = sendRequest;
    this.cashInputView.addRequestHandler(sendRequest);
    this.winnerNumberInputView.addRequestHandler(sendRequest);
  }

  #attachEventListeners() {
    selectDom(SELECTOR.CASH_INPUT_BUTTON_CLASS).addEventListener('click', this.#handleCashInput);
    selectDom('.result-button').addEventListener('click', this.#handleWinnerNumberInput);
    selectDom('.restart-button').addEventListener('click', this.#handleRestart);
  }

  // 금액 입력 시
  #handleCashInput = () => {
    try {
      const lottoArray = this.cashInputView.handleCashInput();
      this.#renderLottos(lottoArray);
    } catch (e) {
      alert(e.message);
    }
  };

  #renderLottos(lottoArray) {
    this.cashInputView.disableCashInput();
    this.purchasedLottoView.renderLottos(lottoArray);
    this.winnerNumberInputView.render();
  }

  // 당첨 번호 입력 시
  #handleWinnerNumberInput = () => {
    try {
      const matchResult = this.winnerNumberInputView.handleWinnerNumberInput();
      this.#renderResultModal(matchResult);
    } catch (e) {
      alert(e.message);
    }
  };

  #renderResultModal(matchResult) {
    this.resultModalView.renderResultModal(matchResult);
  }

  // 재시작 클릭 시
  #handleRestart = () => {
    this.#resetView();
    this.sendRequest(REQUEST_MESSAGE.RESTART_APP);
  };

  #resetView = () => {
    this.cashInputView.resetView();
    this.purchasedLottoView.resetView();
    this.winnerNumberInputView.resetView();
    this.resultModalView.resetView();
  };
}
export default LottoView;
