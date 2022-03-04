/* eslint-disable max-lines-per-function */
/* eslint-disable no-param-reassign */
import EVENT from '../constants/event';
import ID from '../constants/dom';
import { emit, on } from '../utils/event';
import { $, $$ } from '../utils/selector';
import { changeDuplicatedInputsColor, changeOkInputsColor, changeOverInputsColor } from '../utils/style';
import keyCheck from '../utils/keyCheck';

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
    this.#resetFocusedInput();
    this.#goBackInput();
  }

  #goBackInput() {
    this.$$winningNumberInputs.forEach((input) =>
      input.addEventListener('keydown', (e) => WinningNumbersView.#deleteKeydownHandler(e)),
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
    if (activeElement.id === 'bonus-number' && activeElement.value.length <= 1) {
      activeElement.value = '';
      $('#last-basic-input').focus();
      return;
    }
    if (eventTarget.previousElementSibling && activeElement.value.length <= 1) {
      eventTarget.value = '';
      eventTarget.previousElementSibling.focus();
    }
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

  #validateInputs() {
    this.$$winningNumberInputs.forEach(($input, index) => {
      $input.addEventListener('input', (e) => {
        this.#notifyInvalidInputsHandler.call(this, e, index);
      });
    });
  }

  #notifyInvalidInputsHandler(e, index) {
    e.target.value = e.target.value.substr(0, 2);
    changeOverInputsColor(this.$$winningNumberInputs);
    if (e.target.valueAsNumber > 45) {
      return;
    }
    if (e.target.nextElementSibling?.value) {
      return;
    }
    if (this.#isDuplicatedInputs()) {
      this.#changeInvalidInputsColor();
      return;
    }
    this.#moveAutoFocus(e, index);
  }

  #isDuplicatedInputs() {
    const inputNumberList = [];
    this.$$winningNumberInputs.forEach((input) => {
      if (!Number.isNaN(input.valueAsNumber)) {
        inputNumberList.push(input.valueAsNumber);
      }
    });
    if (inputNumberList.length !== new Set(inputNumberList).size) {
      return true;
    }
    return false;
  }

  #moveAutoFocus(e, index) {
    if (!e.target.nextElementSibling && e.target.value.length >= 2) {
      this.$$winningNumberInputs[6].focus();
      return;
    }

    if (e.target.value.length >= 2) {
      this.$$winningNumberInputs[index + 1].focus();
    }
  }

  #resetFocusedInput() {
    this.$$winningNumberInputs.forEach((input) =>
      input.addEventListener('focus', () => {
        input.value = null;
        this.#changeInvalidInputsColor();
      }),
    );
  }

  removeInputValue() {
    this.$winningNumbersReset.click();
  }

  toggleWinningNumbersDisplay() {
    this.$winningNumbersContainer.classList.toggle('hidden');
    this.$basicNumberInput.focus();
  }

  #changeInvalidInputsColor() {
    const inputNumberList = Array.from({ length: 7 });
    this.$$winningNumberInputs.forEach((input, index) => {
      inputNumberList[index] = input.valueAsNumber;
    });
    changeOkInputsColor(inputNumberList, this.$$winningNumberInputs);
    changeDuplicatedInputsColor(inputNumberList, this.$$winningNumberInputs);
    changeOverInputsColor(this.$$winningNumberInputs);
  }
}
