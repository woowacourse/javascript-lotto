import { $ } from '../utils/selector.js';
import { on } from '../utils/event.js';

export default class StatisticsView {
  constructor() {
    this.$statisticsModal = $('#statistics-modal');
    this.$statisticsModalContainer = $('#statistics-modal-container');
    this.$closeButton = $('#close-button');
    this.bindEvents();
  }

  bindEvents() {
    on(this.$statisticsModalContainer, 'click', (e) => this.handleClick(e));
  }

  handleClick(e) {
    if (
      e.target === this.$statisticsModalContainer ||
      e.target === this.$closeButton
    ) {
      this.hideStatisticsModal();
    }
  }

  hideStatisticsModal() {
    this.$statisticsModalContainer.classList.add('hidden');
    this.$statisticsModalContainer.classList.remove('show-flex');
  }
}
