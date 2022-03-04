import { $, $$ } from '../utils/selector.js';
import { on, emit } from '../utils/event.js';
import CUSTOM_EVENT from '../constants/event.js';
import { ID, CLASS } from '../constants/selector.js';

export default class ResultView {
  constructor() {
    this.$resultForm = $(ID.RESULT_FORM);
    this.$resultContainer = $(ID.RESULT_CONTAINER);
    this.$prizeNumberInput = $$(CLASS.PRIZE_NUMBER_INPUT);
    this.$bonusNumberInput = $(ID.BONUS_NUMBER_INPUT);
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

  hideResultView() {
    this.$resultContainer.classList.add('hidden');
  }

  rerenderView() {
    this.$resultForm.reset();
    this.hideResultView();
  }
}
