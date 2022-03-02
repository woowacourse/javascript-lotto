import { $ } from '../utils/dom.js';
import { ID_SELECTOR, CLASS_NAME, ID_NAME } from '../constants.js';
import View from '../core/View.js';

export default class ResultModal extends View {
  _configureDOM() {
    this.$modalContainer = $(ID_SELECTOR.MODAL_CONTAINER);
  }

  _bindEvents() {
    this.$modalContainer.addEventListener('click', ({ target }) => {
      const targetId = target.id;
      if (targetId !== ID_NAME.MODAL_CLOSE && targetId !== ID_NAME.MODAL_CONTAINER) return;
      this.toggleModal();
    });
  }

  toggleModal() {
    this.$modalContainer.classList.toggle(CLASS_NAME.MODAL_OPEN);
  }
}
