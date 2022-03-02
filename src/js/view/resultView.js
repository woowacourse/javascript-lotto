import { $ } from '../utils/selector.js';
import { on } from '../utils/event.js';

export default class ResultView {
  constructor() {
    this.$resultForm = $('#result-form');
    this.$statisticsModalContainer = $('#statistics-modal-container');
    this.bindEvents();
  }

  bindEvents() {
    on(this.$resultForm, 'submit', (e) => this.handleSubmit(e));
  }

  handleSubmit(e) {
    e.preventDefault();
    this.$statisticsModalContainer.classList.remove('hidden');
    this.$statisticsModalContainer.classList.add('show-flex');
  }
}
