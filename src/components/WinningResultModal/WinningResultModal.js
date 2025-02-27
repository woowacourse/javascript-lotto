import {
  RESTART_EVENT_NAME,
  SELECTORS,
} from '../../constants/WinningResultModalConstants.js';
import WinningResultModalView from './WinningResultModalView.js';

class WinningResultModal {
  constructor() {
    this.$modalRoot = document.querySelector(SELECTORS.MODAL_ROOT);
    this.$view = new WinningResultModalView(this.$modalRoot);
    this.$view.setOnResultRequest(() => this.handleRestart());
  }

  renderModal(winningCounts, profitRate) {
    this.$view.renderModal(winningCounts, profitRate);
  }

  handleRestart() {
    const $main = document.querySelector(SELECTORS.MAIN);

    try {
      this.$view.close();
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
