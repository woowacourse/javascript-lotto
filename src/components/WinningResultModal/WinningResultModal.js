// WinningResultModalController.js
import WinningResultModalView from './WinningResultModalView.js';

class WinningResultModal {
  constructor() {
    this.modalRoot = document.querySelector('#modal-root');
    // WinningResultModalView는 이제 ViewComponent를 상속받으므로,
    // modalRoot를 주입하여 생성합니다.
    this.view = new WinningResultModalView(this.modalRoot);
    this.bindControllerEvents();
  }

  renderModal(winningCounts, profitRate) {
    this.view.renderModal(winningCounts, profitRate);
  }

  bindControllerEvents() {
    const main = document.querySelector('#main');
    this.modalRoot.addEventListener(
      'click',
      this.handleRestartClick.bind(this, main),
    );
  }

  handleRestartClick(main, event) {
    if (!event.target.classList.contains('big-button')) return;
    this.view.close();
    try {
      const restartEvent = new CustomEvent('restart', { bubbles: true });
      main.dispatchEvent(restartEvent);
    } catch (e) {
      alert(e.message);
    }
  }
}

export default WinningResultModal;
