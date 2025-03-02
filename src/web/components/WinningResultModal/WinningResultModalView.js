import { WINNING_RESULT_MODAL_SELECTORS } from '../../../common/constants/WinningResultModalConstants.js';
import ViewComponent from '../core/ViewComponent.js';
import getModalMarkup from './template.js';

class WinningResultModalView extends ViewComponent {
  render(winningCounts, profitRate) {
    this.$container.innerHTML = this.#template(winningCounts, profitRate);
    this.#initElements();
    this.#bindEvents();
  }

  #template(winningCounts, profitRate) {
    return getModalMarkup(winningCounts, profitRate);
  }

  #initElements() {
    this.$backdrop = this.$container.querySelector(
      WINNING_RESULT_MODAL_SELECTORS.MODAL_BACKDROP,
    );
    this.$closeButton = this.$container.querySelector(
      WINNING_RESULT_MODAL_SELECTORS.MODAL_CLOSE_BUTTON,
    );

    this.$restartButton = this.$container.querySelector(
      WINNING_RESULT_MODAL_SELECTORS.RESTART_BUTTON,
    );
  }

  #bindEvents() {
    this.#removeBackdropEvents();
    this.#removeCloseButtonEvents();
    this.#removeRestartButtonEvents();
    this.$backdrop.addEventListener('click', (e) =>
      this.#handleBackdropClick(e),
    );
    this.$closeButton.addEventListener('click', (e) =>
      this.#handleCloseButtonClick(e),
    );
    this.$restartButton.addEventListener('click', (e) =>
      this.#handleRestartButtonClick(e),
    );
  }

  #removeBackdropEvents() {
    if (this.$backdrop) {
      this.$backdrop.removeEventListener('click', this.#handleBackdropClick);
    }
  }

  #removeCloseButtonEvents() {
    if (this.$closeButton) {
      this.$closeButton.removeEventListener(
        'click',
        this.#handleCloseButtonClick,
      );
    }
  }

  #removeRestartButtonEvents() {
    if (this.$restartButton) {
      this.$restartButton.removeEventListener(
        'click',
        this.#handleRestartButtonClick,
      );
    }
  }

  #handleBackdropClick = (event) => {
    if (event.target !== this.$backdrop) return;

    this.#close();
  };

  #handleCloseButtonClick = () => {
    this.#close();
  };

  #handleRestartButtonClick = () => {
    if (!this.onResultRequest) return;

    this.#close();
    this.onResultRequest();
  };

  #close() {
    this.$container.innerHTML = '';
    this.#removeBackdropEvents();
    this.#removeCloseButtonEvents();
    this.#removeRestartButtonEvents();
  }

  setOnResultRequest(callback) {
    this.onResultRequest = callback;
  }
}

export default WinningResultModalView;
