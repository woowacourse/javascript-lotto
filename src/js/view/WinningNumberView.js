import { convertToNumber } from '../util/common.js';
import { WINNING_NUMBER_FORM } from './template.js';

export default class WinningNumberView {
  constructor() {
    this.initDom();
  }

  initDom() {
    this.container = document.getElementById('winning-number-container');
  }

  render() {
    this.container.insertAdjacentHTML('beforeend', WINNING_NUMBER_FORM);
  }

  reset() {
    this.container.removeChild(this.container.lastElementChild);
  }

  addSubmitEvent(submitHandler) {
    const form = document.getElementById('winning-number-form');
    const inputs = document.querySelectorAll('.winning-number-input');

    form.addEventListener('submit', e => {
      e.preventDefault();
      const numbers = [];
      inputs.forEach(input => numbers.push(convertToNumber(input.value)));

      submitHandler(numbers);
    });
  }

  nextFocusHandler(input) {
    const maxLength = input.getAttribute('maxlength');
    if (input.value.length >= maxLength) {
      input.value = input.value.substr(0, maxLength);
      if (input.nextElementSibling) {
        input.nextElementSibling.focus();
      }
    }
  }

  addNextInputFocusingEvent() {
    const inputs = document.querySelectorAll('.winning-number-input');

    inputs.forEach(input => {
      input.addEventListener('keyup', () => {
        this.nextFocusHandler(input);
      });
    });
  }
}
