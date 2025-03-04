import LottoMachine from '../domains/LottoMachine.js';
import OutputView from '../views/web/OutputView.js';
import { getById } from '../views/web/utils/dom.js';
import LottoResultModal from '../views/web/components/LottoResultModal.js';
import InputView from '../views/web/InputView.js';
import WinningService from '../services/WinningService.js';

class WebController {
  #lottos;
  #winningService;

  constructor() {
    this.#lottos = [];
    this.#winningService = new WinningService();
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
      const { winningCounts, profitRate } = this.#winningService.getWinningResult({
        lottos: this.#lottos,
        winningNumbers,
        bonusNumber,
      });

      OutputView.showModal(winningCounts, profitRate);
    } catch (error) {
      alert(error.message);
    }
  }

  #handleReset() {
    InputView.resetPurchaseInput();
    OutputView.resetLottoUI();
    this.#lottos = [];
  }
}

export default WebController;
