// WinningResultModalView.js
import ViewComponent from '../core/ViewComponent.js';
import getModalMarkup from './template.js';

class WinningResultModalView extends ViewComponent {
  // ViewComponent의 render() 오버라이드 (초기 렌더링 시 빈 상태)
  render() {
    this.container.innerHTML = '';
  }

  // WinningResultModalView에 특화된 renderModal 메서드
  renderModal(winningCounts, profitRate) {
    this.container.innerHTML = this.template(winningCounts, profitRate);
    this.bindEvents();
  }

  // template 메서드: winningCounts, profitRate를 받아 템플릿을 반환
  template(winningCounts, profitRate) {
    return getModalMarkup(winningCounts, profitRate);
  }

  bindEvents() {
    this.attachBackdropListener();
    this.attachCloseButtonListener();
  }

  attachBackdropListener() {
    const backdrop = this.container.querySelector('.modal-backdrop');
    if (backdrop) {
      backdrop.addEventListener('click', (event) => {
        if (event.target === backdrop) {
          this.close();
        }
      });
    }
  }

  attachCloseButtonListener() {
    const closeButton = this.container.querySelector('.modal-close-button');
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
