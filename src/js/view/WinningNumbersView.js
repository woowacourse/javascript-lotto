import EVENT from '../constants/event';
import ID from '../constants/dom';
import { emit, on } from '../utils/event';
import { $, $$ } from '../utils/selector';

export default class WinningNumbersView {
  constructor() {
    this.$winningNumbersContainer = $(ID.WINNING_NUMBERS_CONTAINER);
    this.$winningNumbersForm = $(ID.WINNING_NUMBERS_FORM);
    this.$winningNumbersReset = $(ID.WINNING_NUMBERS_RESET);
    this.$$winningNumberInputs = $$('.basic-input');
    this.$resultButton = $(ID.RESULT_BUTTON);
    this.#bindEvents();
  }

  #bindEvents() {
    on(this.$winningNumbersForm, 'submit', (e) => this.#handleSubmit(e));
    this.#enableAutoFocus();
    this.#enableInputFocusReset();
    this.#enableDuplicatedNumbersChecker();
  }

  #handleSubmit(e) {
    e.preventDefault();
    const winningNumbers = Array.from({ length: 6 }).map((_, index) => e.target[index].valueAsNumber);
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
        console.log(e.target.valueAsNumber);
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

  #enableInputFocusReset() {
    this.$$winningNumberInputs.forEach((input) =>
      input.addEventListener('focus', () => {
        input.value = null;
        this.#enableDuplicatedNumbersChecker();
      }),
    );
  }

  removeInputValue() {
    this.$winningNumbersReset.click();
  }

  toggleWinningNumbersDisplay() {
    this.$winningNumbersContainer.classList.toggle('hidden');
  }

  #enableDuplicatedNumbersChecker() {
    this.#whitenUniqueInputValue();
    this.#highlightDuplicatedInputValue();
  }

  #whitenUniqueInputValue() {
    const inputNumberList = Array.from({ length: 7 });
    this.$$winningNumberInputs.forEach((input, index) => {
      inputNumberList[index] = input.valueAsNumber;
    });
    this.changeWhite(inputNumberList, this.$$winningNumberInputs);
  }

  #highlightDuplicatedInputValue() {
    const inputNumberList = Array.from({ length: 7 });
    this.$$winningNumberInputs.forEach((input, index) => {
      inputNumberList[index] = input.valueAsNumber;
    });
    this.changeRed(inputNumberList, this.$$winningNumberInputs);
  }

  changeWhite(list, $$inputs) {
    for (let i = 0; i < 7; i += 1) {
      for (let j = i + 1; j < 7; j += 1) {
        if (list[i] !== list[j]) {
          $$inputs[i].style.background = 'white';
          $$inputs[j].style.background = 'white';
        }
      }
    }
  }

  changeRed(list, $$inputs) {
    for (let i = 0; i < 7; i += 1) {
      for (let j = i + 1; j < 7; j += 1) {
        if (list[i] === list[j]) {
          $$inputs[i].style.background = 'orange';
          $$inputs[j].style.background = 'orange';
        }
      }
    }
  }
}
