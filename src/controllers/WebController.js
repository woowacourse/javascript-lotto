import LottoMachine from '../domains/LottoMachine.js';
import OutputView from '../views/web/OutputView.js';
import { getById } from '../views/web/utils/dom.js';
import LottoResultModal from '../views/web/components/LottoResultModal.js';
import { PURCHASE_PRICE } from '../constants/CONFIGURATIONS.js';
import WinningResult from '../domains/WinningResult.js';
import InputView from '../views/web/InputView.js';

class WebController {
  #lottos;

  constructor() {
    this.#lottos = [];
  }

  start() {
    this.#initializeEvent();
    this.#initializeUI();
  }

  #initializeEvent() {
    const $app = getById('app');
    $app.addEventListener('click', this.#addClickEvent.bind(this));
    $app.addEventListener('submit', this.#addSubmitEvent.bind(this));
  }

  #initializeUI() {
    InputView.resetPurchaseInput();
  }

  #addClickEvent(event) {
    const { target } = event;
    if (target.closest('.closeButton') || target.closest('.modalBackground')) {
      LottoResultModal.closeModal();
      return;
    }
    if (target.closest('.resultButton')) {
      event.preventDefault();
      this.#handleLottoResult();
      return;
    }
    if (target.closest('.resetButton')) {
      this.#handleReset();
    }
  }

  #addSubmitEvent(event) {
    if (event.target.closest('section.purchase form')) {
      event.preventDefault();
      this.#handlePurchase();
    }
  }

  #handlePurchase() {
    try {
      const lottoCount = InputView.enterPurchasePrice();
      const lottoMachine = new LottoMachine(lottoCount);
      this.#lottos = lottoMachine.lottos;

      OutputView.printPurchaseLottos(lottoCount, lottoMachine.lottos);
    } catch (error) {
      alert(error.message);
      InputView.resetPurchaseInput();
    }
  }

  #handleLottoResult() {
    try {
      const { winningNumbers, bonusNumber } = InputView.enterWinningAndBonusNumber();
      const { winningCounts, profitRate } = this.#getWinningResult(winningNumbers, bonusNumber);

      OutputView.showModal(winningCounts, profitRate);
    } catch (error) {
      alert(error.message);
    }
  }

  #getWinningResult(winningNumbers, bonusNumber) {
    const winningResult = new WinningResult(winningNumbers, bonusNumber);
    const winningCounts = winningResult.calculate(this.#lottos);
    const profitRate = winningResult.calculateProfitRate(
      this.#lottos.length * PURCHASE_PRICE.UNIT,
      winningCounts,
    );

    return { winningCounts, profitRate };
  }

  #handleReset() {
    InputView.resetPurchaseInput();
    OutputView.resetLottoUI();
    this.#lottos = [];
  }
}

export default WebController;
