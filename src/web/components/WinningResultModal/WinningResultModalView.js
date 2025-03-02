import { WINNING_RESULT_MODAL_SELECTORS } from '../../../common/constants/WinningResultModalConstants.js';
import ViewComponent from '../core/ViewComponent.js';
import getModalMarkup from './template.js';

class WinningResultModalView extends ViewComponent {
  render(winningCounts, profitRate) {
    this.$container.innerHTML = this.#template(winningCounts, profitRate);
    this.#bindEvents();
  }

  #template(winningCounts, profitRate) {
    return getModalMarkup(winningCounts, profitRate);
  }

  #bindEvents() {
    this.#attachBackdropListener();
    this.#attachCloseButtonListener();
    this.#attachRestartButtonListener();
  }

  #attachBackdropListener() {
    const $backdrop = this.$container.querySelector(
      WINNING_RESULT_MODAL_SELECTORS.MODAL_BACKDROP,
    );
    if (!$backdrop) return;

    $backdrop.addEventListener('click', (event) => {
      if (event.target === $backdrop) {
        this.#close();
      }
    });
  }

  #attachCloseButtonListener() {
    const $closeButton = this.$container.querySelector(
      WINNING_RESULT_MODAL_SELECTORS.MODAL_CLOSE_BUTTON,
    );
    if (!$closeButton) return;

    $closeButton.addEventListener('click', () => {
      this.#close();
    });
  }

  #attachRestartButtonListener() {
    const $restartButton = this.$container.querySelector(
      WINNING_RESULT_MODAL_SELECTORS.RESTART_BUTTON,
    );
    if (!$restartButton) return;

    $restartButton.addEventListener('click', () => {
      if (this.onResultRequest) {
        this.#close();
        this.onResultRequest();
      }
    });
  }

  #close() {
    this.$container.innerHTML = '';
  }

  setOnResultRequest(callback) {
    this.onResultRequest = callback;
  }
}

export default WinningResultModalView;
