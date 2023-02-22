import { $$winningNumbers } from '../utils/Dom.js';

class LottoView {
  constructor($element) {
    this.$element = $element;
    this.winningNumbers = [];

    // this.bindInputWinningNumberEvent();
  }

  readEvent(event, eventHandler) {
    this.$element.addEventListener(event, eventHandler);
  }

  createCustomEvent(event, data) {
    const newEvent = new CustomEvent(event, { detail: data });
    this.$element.dispatchEvent(newEvent);
  }

  reset() {
    this.$element.reset();
    this.$element.focus();
  }

  print($element, content) {
    $element.innerText = content;
  }

  bindInputWinningNumberEvent() {
    this.$element.addEventListener('change', (e) => this.inputWinningNumberHandler(e));
  }

  inputWinningNumberHandler(e) {
    e.preventDefault();
    console.log($$winningNumbers);

    // console.log(e.target.elements.winningNumber.value);
    // this.createCustomEvent('inputWinningNumber', e.target);

    // this.winningNumbers[this.$element.dataset.num] = Number(this.$element.value);
    // console.log(this.$element.dataset);
  }
}

export default LottoView;
