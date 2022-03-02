import { $, $$ } from '../utils/selector.js';
import { on, emit } from '../utils/event.js';
import CUSTOM_EVENT from '../constants/event.js';

export default class ResultView {
  constructor() {
    this.$resultForm = $('#result-form');
    this.$resultContainer = $('#result-container');
    this.$prizeNumberInput = $$('.prize-number-input');
    this.$bonusNumberInput = $('#bonus-number-input');
    this.bindEvents();
  }

  bindEvents() {
    on(this.$resultForm, 'submit', (e) => this.handleSubmit(e));
  }

  handleSubmit(e) {
    e.preventDefault();
    const numbers = {
      prizeNumbers: this.$prizeNumberInput.map((input) => input.valueAsNumber),
      bonusNumber: this.$bonusNumberInput.valueAsNumber,
    };

    emit(this.$resultForm, CUSTOM_EVENT.CHECK_RESULT, { numbers });
  }

  showResultView() {
    this.$resultContainer.classList.remove('hidden');
  }
}
