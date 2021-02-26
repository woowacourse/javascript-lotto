import View from './View.js';
import { $ } from '../utils/selector.js';

export default class InputPriceView extends View {
  constructor($element) {
    super($element);
    this.bindInputPriceEvent();
  }

  resetInputPrice() {
    $('#input-price').value = '';
    $('#input-price').focus();
  }

  bindInputPriceEvent() {
    this.$element.addEventListener('submit', e => this.inputPriceHandler(e));
  }

  inputPriceHandler(e) {
    e.preventDefault();

    const inputPrice = e.target.elements.price.value;
    this.emit('submitPrice', inputPrice);
  }
}
