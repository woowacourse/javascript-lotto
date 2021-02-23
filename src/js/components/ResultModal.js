import { $ } from '../utils/DOM.js';

export default class ResultModal {
  constructor({ isVisible }) {
    this.$modal = $('.modal');
    this.$modalClose = $('.modal-close');
    this.isVisible = isVisible;
  }

  attachEvents() {
    this.$modalClose.addEventListener('click', this.onCloseModal.bind(this));
  }

  onCloseModal() {
    this.setState({ isVisible: false });
  }

  setState({ isVisible }) {
    if (typeof isVisible === 'boolean') {
      this.isVisible = isVisible;
      this.renderModal();
    }
  }

  renderModal() {
    this.isVisible ? this.$modal.classList.add('open') : this.$modal.classList.remove('open');
  }
}
