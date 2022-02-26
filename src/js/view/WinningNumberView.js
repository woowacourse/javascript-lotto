import { WINNING_NUMBER_FORM } from './template.js';

export default class WinningNumberView {
  constructor() {
    this.container = document.getElementById('winning-number-container');
  }

  render() {
    this.container.insertAdjacentHTML('beforeend', WINNING_NUMBER_FORM);
  }

  reset() {
    this.container.removeChild(this.container.lastElementChild);
  }
}
