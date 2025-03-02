import {
  RESTART_EVENT_NAME,
  WINNING_RESULT_MODAL_SELECTORS,
} from '../../../common/constants/WinningResultModalConstants.js';
import WinningResultModalView from './WinningResultModalView.js';

class WinningResultModal {
  constructor() {
    this.$modalRoot = document.querySelector(
      WINNING_RESULT_MODAL_SELECTORS.MODAL_ROOT,
    );
    this.$view = new WinningResultModalView(this.$modalRoot);
    this.$view.setOnResultRequest(() => this.#handleRestart());
  }

  render(winningCounts, profitRate) {
    this.$view.render(winningCounts, profitRate);
  }

  #handleRestart() {
    const $main = document.querySelector(WINNING_RESULT_MODAL_SELECTORS.MAIN);

    try {
      const restartEvent = new CustomEvent(RESTART_EVENT_NAME, {
        bubbles: true,
      });
      $main.dispatchEvent(restartEvent);
    } catch (e) {
      alert(e.message);
    }
  }
}

export default WinningResultModal;
