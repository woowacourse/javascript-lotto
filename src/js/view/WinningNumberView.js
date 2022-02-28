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
    const inputs = document.getElementsByClassName('winning-number-input');

    form.addEventListener('submit', e => {
      e.preventDefault();
      const numbers = [];
      for (let i = 0; i < inputs.length; i++) {
        numbers.push(convertToNumber(inputs.item(i).value));
      }

      submitHandler(numbers);
    });
  }
}
