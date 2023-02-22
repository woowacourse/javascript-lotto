import { ConsoleMessage } from '../constants/Constants.js';
import { $, $$ } from '../utils/DomSelector.js';

class LottoResultView {
  constructor() {
    this.#initDom();
  }

  #initDom() {
    this.resultModal = $('.result-modal');
    this.matchCounts = $$('.match-count');
    this.profitRate = $('#profit-rate');
    this.closeIcon = $('.close-icon');
    this.restartButton = $('#restart-button');

    this.addCloseClickEvent();
    this.addModalBackdropClickEvent();
  }

  showResultModal() {
    this.resultModal.showModal();
  }

  showRanks(ranks) {
    this.matchCounts.forEach((element) => {
      element.textContent = `${ranks[element.dataset.index]}개`;
    });
  }

  showProfitRate(profitRate) {
    this.profitRate.textContent = ConsoleMessage.profitRateResult(profitRate);
  }

  addCloseClickEvent() {
    this.closeIcon.addEventListener('click', this.closeResultModal.bind(this));
  }

  addModalBackdropClickEvent() {
    this.resultModal.addEventListener('click', this.closeResultModal.bind(this));
  }

  closeResultModal(event) {
    if (event.target === event.currentTarget) {
      this.resultModal.close();
    }
  }

  addRestartButtonClickEvent(callback) {
    this.restartButton.addEventListener('click', (event) => {
      event.stopPropagation();
      callback();
    });
  }

  restart() {
    this.resultModal.close();
  }
}

export default LottoResultView;
