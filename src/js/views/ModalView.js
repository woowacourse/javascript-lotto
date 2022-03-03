import { $ } from '../utils/element-manager';
import { setDelay } from '../utils/event-manager';

export default class ModalView {
  #modalContainer;
  #modalContent;

  constructor(modalContentSelector) {
    this.#modalContainer = $('.modal-container');
    this.#modalContent = $(modalContentSelector);

    this.#bindEvents();
  }

  #bindEvents() {
    this.#modalContainer.addEventListener('click', this.#handleModalClose.bind(this));
  }

  #handleModalClose({ target: $target }) {
    if (
      $target.classList.contains('modal-container') === false &&
      $target.classList.contains('modal-close') === false
    ) {
      return;
    }

    this.hide();
  }

  show() {
    this.#modalContent.classList.add('focus');
    this.#modalContainer.classList.remove('hide');

    document.documentElement.setAttribute('data-modal', this.#modalContent.id);
  }

  async hide() {
    this.#modalContainer.classList.add('disappear');
    await setDelay(300);

    this.#modalContainer.classList.add('hide');
    this.#modalContainer.classList.remove('disappear');

    this.#modalContent.classList.remove('focus');
    document.documentElement.removeAttribute('data-modal');
  }
}
