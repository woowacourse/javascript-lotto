import { getResultTemplate } from './template.js';

export default class PopupView {
  constructor() {
    this.initDom();
    this.addCloseEvent();
  }

  initDom() {
    this.popup = document.getElementById('popup');
    this.popupBack = document.getElementById('popup-back');
    this.closeButton = document.getElementById('close-button');
  }

  render(result, rewardRate) {
    scroll({
      behavior: 'smooth',
      top: 0,
    });
    this.popup.insertAdjacentHTML(
      'beforeend',
      getResultTemplate(result, rewardRate),
    );
    this.visible();
  }

  visible() {
    this.popup.classList.toggle('hidden');
    this.popupBack.classList.toggle('popup-back');
  }

  closeHandler() {
    this.visible();
    this.popup.removeChild(this.popup.lastElementChild);
  }

  addCloseEvent() {
    this.closeButton.addEventListener('click', this.closeHandler.bind(this));
  }

  addRestartEvent(resetEvent) {
    const restartButton = document.getElementById('restart-button');
    restartButton.addEventListener('click', () => {
      resetEvent();
      this.closeHandler();
    });
  }
}
