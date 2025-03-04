import OutputView from '../views/web/OutputView.js';
import { getById } from '../views/web/utils/dom.js';
import LottoResultModal from '../views/web/components/LottoResultModal.js';
import InputView from '../views/web/InputView.js';
import LottoService from '../services/LottoService.js';

class WebController {
  #lottoService;

  constructor() {
    this.#lottoService = new LottoService();
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
      this.#lottoService.handleLottoResult();
      return;
    }
    if (target.closest('.resetButton')) {
      this.#handleReset();
    }
  }

  #addSubmitEvent(event) {
    if (event.target.closest('section.purchase form')) {
      event.preventDefault();
      this.#lottoService.handlePurchase();
    }
  }

  #handleReset() {
    InputView.resetPurchaseInput();
    OutputView.resetLottoUI();
    this.#lottoService.resetLotto();
  }
}

export default WebController;
