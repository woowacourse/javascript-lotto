// WinningResultModalView.js
import { SELECTORS } from '../../constants/WinningResultModalConstants.js';
import ViewComponent from '../core/ViewComponent.js';
import getModalMarkup from './template.js';

class WinningResultModalView extends ViewComponent {
  render() {
    this.container.innerHTML = '';
  }

  renderModal(winningCounts, profitRate) {
    this.container.innerHTML = this.template(winningCounts, profitRate);
    this.bindEvents();
  }

  template(winningCounts, profitRate) {
    return getModalMarkup(winningCounts, profitRate);
  }

  bindEvents() {
    this.attachBackdropListener();
    this.attachCloseButtonListener();
  }

  attachBackdropListener() {
    const backdrop = this.container.querySelector(SELECTORS.MODAL_BACKDROP);
    if (backdrop) {
      backdrop.addEventListener('click', (event) => {
        if (event.target === backdrop) {
          this.close();
        }
      });
    }
  }

  attachCloseButtonListener() {
    const closeButton = this.container.querySelector(
      SELECTORS.MODAL_CLOSE_BUTTON,
    );
    if (closeButton) {
      closeButton.addEventListener('click', () => {
        this.close();
      });
    }
  }

  close() {
    this.container.innerHTML = '';
  }
}

export default WinningResultModalView;
