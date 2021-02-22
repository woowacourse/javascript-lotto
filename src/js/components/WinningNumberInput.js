import {
  LOTTO_MIN_NUMBER,
  LOTTO_MAX_NUMBER,
  WINNING_NUMBER_CHECK_MESSAGE,
  LOTTO_NUMBERS_LENGTH,
  BONUS_NUMBER_LENGTH,
} from '../constants.js';
import { $, $$, show, hide, enable } from '../utils/DOM.js';

export default class WinningNumberInput {
  constructor({ isVisible }) {
    this.$winningNumberForm = $('.winning-number-form');
    this.$winningNumberInputs = $$('.winning-number');
    this.$bonusNumberInput = $('.bonus-number');
    this.$winningNumberCheckMessage = $('.winning-number-check-message');
    this.$openResultModalButton = $('.open-result-modal-button');

    this.isVisible = isVisible;

    this.attachEvents();
  }

  attachEvents() {
    this.$winningNumberForm.addEventListener('keyup', this.onChangeWinningNumberInput.bind(this));
  }

  onChangeWinningNumberInput(e) {
    if (e.target.type !== 'number') {
      return;
    }

    const inputValues = [...e.currentTarget.querySelectorAll('input[type="number"]')]
      .filter(($input) => $input.value !== '')
      .map(($input) => Number($input.value));

    const checkMessage = this.validateInput(inputValues);
    this.renderCheckMessage(checkMessage);
  }

  validateInput(inputValues) {
    if (inputValues.some(this.isOutOfRange)) {
      return WINNING_NUMBER_CHECK_MESSAGE.OUT_OF_RANGE;
    }

    if (this.isDuplicated(inputValues)) {
      return WINNING_NUMBER_CHECK_MESSAGE.DUPLICATED;
    }

    if (this.hasBlank(inputValues)) {
      return WINNING_NUMBER_CHECK_MESSAGE.HAS_BLANK;
    }

    return WINNING_NUMBER_CHECK_MESSAGE.COMPLETED;
  }

  isOutOfRange(number) {
    return number < LOTTO_MIN_NUMBER || number > LOTTO_MAX_NUMBER;
  }

  isDuplicated(numbers) {
    return new Set(numbers).size !== numbers.length;
  }

  hasBlank(numbers) {
    return numbers.length !== LOTTO_NUMBERS_LENGTH + BONUS_NUMBER_LENGTH;
  }

  setState({ isVisible }) {
    this.isVisible = isVisible;
    this.renderForm();
  }

  renderCheckMessage(checkMessage) {
    this.$winningNumberCheckMessage.classList.replace('text-green', 'text-red');
    this.$winningNumberCheckMessage.innerText = checkMessage;

    if (checkMessage === WINNING_NUMBER_CHECK_MESSAGE.COMPLETED) {
      this.$winningNumberCheckMessage.classList.replace('text-red', 'text-green');
      enable(this.$openResultModalButton);
    }
  }

  renderForm() {
    if (this.isVisible) {
      show(this.$winningNumberForm);
      this.$winningNumberInputs[0].focus();
    } else {
      hide(this.$winningNumberForm);
    }
  }
}
