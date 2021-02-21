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

    //const targetValue = Number(e.target.value);
    const inputValues = [...e.currentTarget.querySelectorAll('input[type="number"]')]
      .filter(($input) => $input.value !== '')
      .map(($input) => Number($input.value));
    const checkMessage = this.validateInput(inputValues);

    this.$winningNumberCheckMessage.innerText = checkMessage;
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

  setState({ isVisible }) {
    this.isVisible = isVisible;
    this.render();
  }

  render() {
    this.isVisible ? show(this.$winningNumberForm) : hide(this.$winningNumberForm);
    this.$winningNumberInputs[0].focus();
  }
}
