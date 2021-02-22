import {
  LOTTO_MIN_NUMBER,
  LOTTO_MAX_NUMBER,
  WINNING_NUMBER_CHECK_MESSAGE,
  LOTTO_NUMBERS_LENGTH,
  BONUS_NUMBER_LENGTH,
} from '../constants.js';
import { $, $$, show, hide, enable } from '../utils/DOM.js';

export default class WinningNumberInput {
  constructor({ isVisible, onShowModal }) {
    this.$winningNumberForm = $('.winning-number-form');
    this.$winningNumberInputs = $$('.winning-number');
    this.$bonusNumberInput = $('.bonus-number');
    this.$winningNumberCheckMessage = $('.winning-number-check-message');
    this.$openResultModalButton = $('.open-result-modal-button');

    this.isVisible = isVisible;
    this.checkMessage = '';
    this.onShowModal = onShowModal;

    this.attachEvents();
  }

  attachEvents() {
    this.$winningNumberForm.addEventListener('keyup', this.onChangeWinningNumberInput.bind(this));
    this.$openResultModalButton.addEventListener('click', this.onShowModal);
  }

  onChangeWinningNumberInput(e) {
    if (e.target.type !== 'number') {
      return;
    }

    const inputValues = [...e.currentTarget.querySelectorAll('input[type="number"]')]
      .filter(($input) => $input.value !== '')
      .map(($input) => Number($input.value));

    this.setState({ checkMessage: this.validateInput(inputValues) });
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

  setState({ isVisible, checkMessage }) {
    if (isVisible) {
      this.isVisible = isVisible;
      this.renderForm();
    }

    if (typeof checkMessage === 'string' && this.checkMessage !== checkMessage) {
      this.checkMessage = checkMessage;
      this.renderCheckMessage();
    }
  }

  renderCheckMessage() {
    this.$winningNumberCheckMessage.innerText = this.checkMessage;

    if (this.checkMessage !== WINNING_NUMBER_CHECK_MESSAGE.COMPLETED) {
      this.$winningNumberCheckMessage.classList.replace('text-green', 'text-red');
      return;
    }

    this.$winningNumberCheckMessage.classList.replace('text-red', 'text-green');
    enable(this.$openResultModalButton);
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
