import { $ } from './utils/dom.js';
import { getLottoPrice, checkLottoPrice } from './core/checkInputValue.js';
import { handleToggleButtonClick } from './component/toggleButton.js';
import { drawLotto } from './core/drawLotto.js';
export default class App {
  constructor() {
    this.lottoPrice = 0;
    this.handleEvent();
  }
  handleEvent() {
    $('.lotto-price-input-form').addEventListener(
      'submit',
      this.handlePriceInputSubmit,
    );
    $('.purchased-lotto-list-container').addEventListener(
      'click',
      handleToggleButtonClick,
    );
  }

  handlePriceInputSubmit(event) {
    event.preventDefault();
    const lottoPrice = checkLottoPrice(getLottoPrice());
    if (!lottoPrice) {
      $('.lotto-price-input').value = '';
      return;
    }
    this.lottoPrice = lottoPrice;
    $('.lotto-price-input').disabled = true;
    drawLotto(this.lottoPrice);
  }
}

new App();
