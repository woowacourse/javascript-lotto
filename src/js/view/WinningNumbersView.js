import EVENT from '../constants/event';
import ID from '../constants/selector';
import { emit, on } from '../utils/event';
import { $ } from '../utils/selector';

export default class WinningNumbersView {
  constructor(lottoResult) {
    this.lottoResult = lottoResult;
    this.$winningNumbersForm = $(ID.WINNING_NUMBERS_FORM);
    this.#bindEvents();
  }

  #bindEvents() {
    on(this.$winningNumbersForm, 'submit', (e) => this.#handleSubmit(e));
  }

  #handleSubmit(e) {
    e.preventDefault();
    const winningNumbers = [0, 1, 2, 3, 4, 5].map(
      (i) => e.target[i].valueAsNumber,
    );
    const bonusNumber = e.target[6].valueAsNumber;
    emit(this.$winningNumbersForm, EVENT.SUBMIT_RESULT, {
      winningNumbers,
      bonusNumber,
    });
  }

  removeInputValue() {
    console.log(this.$winningNumbersForm.event);
    [0, 1, 2, 3, 4, 5, 6].forEach((i) => {
      this.$winningNumbersForm.event.target[i].value = '';
    });
  }

  resetInput() {
    $('#winning-numbers-reset').click();
  }
}
