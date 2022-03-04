import makeTemplate from './template/index';

export default class PopupView {
  constructor() {
    this.$popup = document.querySelector('#popup');
    this.$mainContainer = document.querySelector('.main-container');
  }

  renderPopup(winningType, earningRate) {
    this.$popup.insertAdjacentHTML('beforeend', makeTemplate.makePopupTemplate(winningType, earningRate));
  }

  toggleMainContainerState() {
    this.$mainContainer.classList.toggle('blocked');
    this.$popup.classList.toggle('emphasized');
  }

  closePopup() {
    this.$popup.replaceChildren();
  }
}
