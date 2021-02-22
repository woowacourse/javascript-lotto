import View from './View.js';
import { $ } from '../utils/dom.js';

export default class WinningNumberInput extends View {
  constructor($element) {
    super($element);
    this.$showResultButton = $('.open-result-modal-button');
    this.$modalClose = $('.modal-close');
    this.$modal = $('.modal');
    this.bindModalEvent();
  }

  bindModalEvent() {
    this.$showResultButton.addEventListener(
      'click',
      this.onModalShow.bind(this)
    );
    this.$modalClose.addEventListener('click', this.onModalClose.bind(this));
  }

  onModalShow() {
    this.$modal.classList.add('open');
  }

  onModalClose() {
    this.$modal.classList.remove('open');
  }
}
