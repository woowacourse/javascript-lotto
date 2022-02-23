import { $ } from './utils/dom.js';
import { getLottoPrice, checkLottoPrice } from './core/checkInputValue.js';
import { makeLottos } from './core/playLotto.js';
import {
  renderLastLottoNumber,
  renderPurchasedLottoList,
} from './views/render.js';
import { handleToggleButtonClick } from './component/toggleButton.js';

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

    $('.purchased-lotto-list-container').addEventListener(
      'click',
      handleToggleButtonClick,
    );
  }

  handlePriceInputEvent(event) {
    event.preventDefault();
    const lottoPrice = checkLottoPrice(getLottoPrice());
    if (!lottoPrice) {
      $('.lotto-price-input').value = '';
      return;
    }
    this.lottoPrice = lottoPrice;
    $('.lotto-price-input').disabled = true;
    makeLottos(this.lottoPrice / 1000);
    renderPurchasedLottoList(this.lottoPrice / 1000);
    renderLastLottoNumber();
  }
}

new App();
