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
    if (e.target.type !== 'number' || e.target.value === '') {
      return;
    }

    const inputValues = [...e.currentTarget.querySelectorAll('input[type="number"]')]
      .filter(($input) => $input.value !== '')
      .map(($input) => Number($input.value));
    const checkMessage = this.validateInput(inputValues);

    this.$winningNumberCheckMessage.innerText = checkMessage;
    if (checkMessage === '' && this.isCompletedInput(inputValues)) {
      enable(this.$openResultModalButton);
    }
  }

  validateInput(inputValues) {
    if (inputValues.some(this.isOutOfRange)) {
      return WINNING_NUMBER_CHECK_MESSAGE.OUT_OF_RANGE;
    }

    if (this.isDuplicated(inputValues)) {
      return WINNING_NUMBER_CHECK_MESSAGE.DUPLICATED;
    }

    return '';
  }

  isOutOfRange(number) {
    return number < LOTTO_MIN_NUMBER || number > LOTTO_MAX_NUMBER;
  }

  isDuplicated(numbers) {
    return new Set(numbers).size !== numbers.length;
  }

  isCompletedInput(numbers) {
    return numbers.length === LOTTO_NUMBERS_LENGTH + BONUS_NUMBER_LENGTH;
  }

  setState({ isVisible }) {
    this.isVisible = isVisible;
    this.render();
  }

  render() {
    if (this.isVisible) {
      show(this.$winningNumberForm);
      this.$winningNumberInputs[0].focus();
    } else {
      hide(this.$winningNumberForm);
    }
  }
}
