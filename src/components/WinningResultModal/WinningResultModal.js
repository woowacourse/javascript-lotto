import {
  RESTART_EVENT_NAME,
  SELECTORS,
} from '../../constants/WinningResultModalConstants.js';
import WinningResultModalView from './WinningResultModalView.js';

class WinningResultModal {
  constructor() {
    this.modalRoot = document.querySelector(SELECTORS.MODAL_ROOT);
    this.view = new WinningResultModalView(this.modalRoot);
    this.bindEvents();
  }

  renderModal(winningCounts, profitRate) {
    this.view.renderModal(winningCounts, profitRate);
  }

  bindEvents() {
    const main = document.querySelector(SELECTORS.MAIN);
    this.modalRoot.addEventListener(
      'click',
      this.handleRestartClick.bind(this, main),
    );
  }

  handleRestartClick(main, event) {
    if (!event.target.classList.contains(SELECTORS.BIG_BUTTON)) return;
    this.view.close();

    try {
      const restartEvent = new CustomEvent(RESTART_EVENT_NAME, {
        bubbles: true,
      });
      main.dispatchEvent(restartEvent);
    } catch (e) {
      alert(e.message);
    }
  }
}

export default WinningResultModal;
