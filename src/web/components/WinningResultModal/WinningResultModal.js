import {
  RESTART_EVENT_NAME,
  SELECTORS,
} from '../../../common/constants/WinningResultModalConstants.js';
import WinningResultModalView from './WinningResultModalView.js';

class WinningResultModal {
  constructor() {
    this.$modalRoot = document.querySelector(SELECTORS.MODAL_ROOT);
    this.$view = new WinningResultModalView(this.$modalRoot);
    this.$view.setOnResultRequest(() => this.#handleRestart());
  }

  render(winningCounts, profitRate) {
    this.$view.render(winningCounts, profitRate);
  }

  #handleRestart() {
    const $main = document.querySelector(SELECTORS.MAIN);

    try {
      const restartEvent = new CustomEvent(RESTART_EVENT_NAME, {
        bubbles: true,
      });
      $main.dispatchEvent(restartEvent);
    } catch (e) {
      alert('예상하지 못한 오류입니다. 다시 시도해주세요.');
    }
  }
}

export default WinningResultModal;
