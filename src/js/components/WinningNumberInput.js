import { LOTTO_MIN_NUMBER, LOTTO_MAX_NUMBER, WINNING_NUMBER_CHECK_MESSAGE } from '../constants.js';
import { $, $$, show, hide } from '../utils/DOM.js';

export default class WinningNumberInput {
  constructor({ isVisible }) {
    this.$winningNumberForm = $('.winning-number-form');
    this.$winningNumberInputs = $$('.winning-number');
    this.$bonusNumberInput = $('.bonus-number');
    this.$winningNumberCheckMessage = $('.winning-number-check-message');

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

    const inputValue = Number(e.target.value);
    const errorMessage = this.validateInput(inputValue);

    if (errorMessage !== '') {
      this.$winningNumberCheckMessage.innerText = errorMessage;
    }
  }

  validateInput(number) {
    if (this.isOutOfRange(number)) {
      return WINNING_NUMBER_CHECK_MESSAGE.OUT_OF_RANGE;
    }

    return '';
  }

  isOutOfRange(number) {
    return number < LOTTO_MIN_NUMBER || number > LOTTO_MAX_NUMBER;
  }

  setState({ isVisible }) {
    this.isVisible = isVisible;
    this.render();
  }

  render() {
    this.isVisible ? show(this.$winningNumberForm) : hide(this.$winningNumberForm);
    this.$winningNumberInputs[0].focus();
  }
}
