import ID from '../constants/selector';
import { $ } from '../utils/selector';

export default class ResultModalView {
  constructor() {
    this.$modalContainer = $(ID.MODAL_CONTAINER);
    this.$modal = $('.modal');
    this.bindEvents();
  }

  bindEvents() {
    window.addEventListener('click', (e) =>
      e.target !== this.$modal
        ? this.$modal.classList.remove('show-modal')
        : false,
    );
    window.addEventListener('click', () => console.log('hi'));
  }

  showModal() {
    this.$modal.classList.add('show-modal');
  }

  hideModal() {
    this.$modal.classList.remove('show-modal');
  }
}
