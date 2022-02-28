import { getResultTemplate } from './template.js';

export default class PopupView {
  constructor() {
    this.initDom();
    this.addCloseEvent();
  }

  initDom() {
    this.popup = document.getElementById('popup');
    this.closeButton = document.getElementById('close-button');
  }

  render(result, percent) {
    this.popup.insertAdjacentHTML('beforeend', getResultTemplate(result, percent));
    this.visible();
  }

  visible() {
    this.popup.classList.toggle('hidden');
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
