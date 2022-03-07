import EVENT from '../constants/event';
import ID from '../constants/dom';
import { emit, on } from '../utils/event';
import { $, $$ } from '../utils/selector';
import { changeDuplicatedInputsColor, changeOkInputsColor, changeOverInputsColor } from '../utils/style';
import LOTTO from '../constants/lotto';

export default class WinningNumbersView {
  constructor() {
    this.$winningNumbersContainer = $(ID.WINNING_NUMBERS_CONTAINER);
    this.$winningNumbersForm = $(ID.WINNING_NUMBERS_FORM);
    this.$winningNumbersReset = $(ID.WINNING_NUMBERS_RESET);
    this.$$winningNumberInputs = $$('.basic-input');
    this.$resultButton = $(ID.RESULT_BUTTON);
    this.$basicNumberInput = $(ID.BASIC_NUMBER_INPUT);
    this.#bindEvents();
  }

  #bindEvents() {
    on(this.$winningNumbersForm, 'submit', (e) => this.#handleSubmit(e));
    this.#validateInputs();
    this.#goBackInput();
  }

  #goBackInput() {
    this.$$winningNumberInputs.forEach((input) =>
      input.addEventListener('keyup', (e) => WinningNumbersView.#deleteKeydownHandler(e)),
    );
  }

  static #deleteKeydownHandler(e) {
    if (e.keyCode === 8 || e.keyCode === 46) {
      WinningNumbersView.#moveReverseFocus(e);
    }
  }

  static #moveReverseFocus(e) {
    const { activeElement } = document;
    const eventTarget = e.target;
    if (activeElement.id === 'bonus-number' && activeElement.value.length === 0) {
      $('#last-basic-input').focus();
      return;
    }
    if (eventTarget.previousElementSibling && activeElement.value.length === 0) {
      eventTarget.previousElementSibling.focus();
    }
  }

  #handleSubmit(e) {
    e.preventDefault();
    const winningNumbers = Array.from({ length: this.$$winningNumberInputs.length - 1 }).map(
      (_, index) => e.target[index].valueAsNumber,
    );
    const bonusNumber = e.target[this.$$winningNumberInputs.length - 1].valueAsNumber;
    emit(this.$winningNumbersForm, EVENT.SUBMIT_RESULT, {
      winningNumbers,
      bonusNumber,
    });
  }

  #validateInputs() {
    this.$$winningNumberInputs.forEach(($input, index) => {
      $input.addEventListener('input', (e) => {
        this.#notifyInvalidInputsHandler.call(this, e, index);
      });
    });
  }

  #notifyInvalidInputsHandler(e, index) {
    e.target.value = e.target.value.substr(0, 2);
    this.#changeInvalidInputsColor();

    if (e.target.nextElementSibling?.value) {
      return;
    }

    if (!e.target.nextElementSibling && this.$$winningNumberInputs[LOTTO.NUMBER_COUNT].value) {
      return;
    }

    this.#moveAutoFocus(e, index);
  }

  #isDuplicatedInputs() {
    const inputNumberList = this.$$winningNumberInputs.filter((input) => !Number.isNaN(input.valueAsNumber));

    return inputNumberList.length !== new Set(inputNumberList).size;
  }

  #moveAutoFocus(e, index) {
    if (!e.target.nextElementSibling && e.target.value.length >= 2) {
      this.$$winningNumberInputs[this.$$winningNumberInputs.length - 1].focus();
      return;
    }

    if (e.target.value.length >= 2) {
      this.$$winningNumberInputs[index + 1].focus();
    }
  }

  removeInputValue() {
    this.$winningNumbersReset.click();
  }

  toggleWinningNumbersDisplay() {
    this.$winningNumbersContainer.classList.toggle('hidden');
    this.$basicNumberInput.focus();
  }

  #changeInvalidInputsColor() {
    const inputNumberList = this.$$winningNumberInputs.map((input) => input.valueAsNumber);
    console.log(inputNumberList);
    changeOkInputsColor(inputNumberList, this.$$winningNumberInputs);
    changeDuplicatedInputsColor(inputNumberList, this.$$winningNumberInputs);
    changeOverInputsColor(this.$$winningNumberInputs);
  }
}
