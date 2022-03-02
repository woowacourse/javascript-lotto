import EVENT from '../constants/event';
import ID from '../constants/selector';
import { emit, on } from '../utils/event';
import { $, $$ } from '../utils/selector';

export default class WinningNumbersView {
  constructor(lottoResult) {
    this.lottoResult = lottoResult;
    this.$winningNumbersForm = $(ID.WINNING_NUMBERS_FORM);
    this.$winningNumbersReset = $(ID.WINNING_NUMBERS_RESET);
    this.$$winningNumberInputs = $$('.basic-input');
    this.$resultButton = $(ID.RESULT_BUTTON);
    this.#bindEvents();
  }

  #bindEvents() {
    on(this.$winningNumbersForm, 'submit', (e) => this.#handleSubmit(e));

    this.#enableAutoFocus();
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

  #enableAutoFocus() {
    this.$$winningNumberInputs.forEach(($input, index) => {
      $input.addEventListener('keyup', (e) => {
        if (e.target.valueAsNumber <= 45) {
          this.#handleAutoFocus(e, index);
          return;
        }
        e.target.value = e.target.value.substr(0, 2);
        this.$resultButton.click();
      });
    });
  }

  #handleAutoFocus(e, index) {
    if (index === 6 && e.target.value.length >= 2) {
      this.$resultButton.focus();
      return;
    }
    if (e.target.value.length >= 2) {
      this.$$winningNumberInputs[index + 1].focus();
    }
  }

  removeInputValue() {
    console.log(this.$winningNumbersForm.event);
    [0, 1, 2, 3, 4, 5, 6].forEach((i) => {
      this.$winningNumbersForm.event.target[i].value = '';
    });
  }

  resetInput() {
    this.$winningNumbersReset.click();
  }
}
