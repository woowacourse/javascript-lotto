import { $ } from './utils/dom.js';
import { getLottoPrice, checkLottoPrice } from './core/checkInputValue.js';
export default class App {
  constructor() {
    this.lottoPrice = 0;
    this.handleEvent();
  }
  handleEvent() {
    $('.lotto-price-input-form').addEventListener(
      'submit',
      this.handlePriceInputEvent,
    );
  }

  handlePriceInputEvent(event) {
    event.preventDefault();
    const lottoPrice = checkLottoPrice(getLottoPrice());
    if (lottoPrice) {
      this.lottoPrice = lottoPrice;
    }
    $('.lotto-price-input').value = '';
  }
}

new App();
