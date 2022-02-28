import { $ } from '../utils/selector';
import makeTemplate from './template';

export default class PopupView {
  constructor() {
    this.$popup = $('#popup');
    this.$mainContainer = $('.main-container');
  }

  renderPopup(winningType, earningRate) {
    this.$popup.insertAdjacentHTML(
      'beforeend',
      makeTemplate.makePopupTemplate(winningType, earningRate),
    );
  }

  toggleMainContainerState() {
    this.$mainContainer.classList.toggle('blocked');
    this.$popup.classList.toggle('emphasized');
  }

  closePopup() {
    this.$popup.replaceChildren();
  }
}
