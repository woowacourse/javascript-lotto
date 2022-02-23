import { LOTTO_NUMBER_FORM } from './template.js';

export default class LottoNumberView {
  constructor() {
    this.initDom();
  }

  initDom() {
    this.container = document.getElementById('lotto-number-container');
  }

  render() {
    this.container.insertAdjacentHTML('beforeend', LOTTO_NUMBER_FORM);
  }

  reset() {
    this.container.removeChild(this.container.lastElementChild);
  }
}
