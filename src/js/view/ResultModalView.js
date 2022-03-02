import ID from '../constants/selector';
import { $ } from '../utils/selector';

export default class ResultModalView {
  constructor() {
    this.$modalContainer = $(ID.MODAL_CONTAINER);
    this.$modal = $('.modal');
    this.$closeButton = $('.close');

    this.#bindEvents();
  }

  #bindEvents() {
    // window.addEventListener('click', (e) =>
    //   e.target !== this.$modal ? this.hideModal() : false,
    // );
    this.$closeButton.addEventListener('click', () => this.hideModal());
  }

  showModal() {
    this.$modalContainer.classList.add('show-modal');
  }

  hideModal() {
    this.$modalContainer.classList.remove('show-modal');
  }

  //   renderWinningCounts(winningCounts) {}

  //   renderYield(lottoYield) {}
}
