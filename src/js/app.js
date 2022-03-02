import { $ } from './utils/dom.js';
import { getLottoPrice, checkLottoPrice } from './core/checkInputValue.js';
import { toggleButton } from './component/toggleButton.js';
import { drawLotto } from './core/drawLotto.js';
import {
  renderPurchasedLottoList,
  renderLastLottoNumber,
  renderPurchasedLottoListContent,
  renderPurchasedLottoListContentIsActive,
} from './views/render.js';

export default class App {
  constructor() {
    this.handleEvent();
    this.lottoPrice = 0;
    this.lottoPriceValid = false;
    this.lottoList = [];
  }

  handleEvent() {
    $('.lotto-price-input-form').addEventListener('submit', e => {
      e.preventDefault();
      this.handleSubmitPriceInput();
    });
    $('.lotto-price-input-form').addEventListener('submit', e => {
      e.preventDefault();
      this.handleDrawLotto();
    });
    $('.purchased-lotto-list-container').addEventListener('click', e => {
      e.preventDefault();
      if (!e.target.classList.contains(`onoff-switch`)) {
        return;
      }
      this.handleClickToggleButton();
    });
  }

  handleSubmitPriceInput() {
    const lottoPrice = checkLottoPrice(getLottoPrice());
    if (!lottoPrice) {
      $('.lotto-price-input').value = '';
      return;
    }
    this.lottoPrice = lottoPrice;
    this.lottoPriceValid = true;
    $('.lotto-price-input').disabled = true;
    $('.lotto-price-submit-button').disabled = true;
  }

  handleDrawLotto() {
    if (!this.lottoPriceValid) {
      return;
    }
    this.lottoList = drawLotto(this.lottoPrice);
    renderPurchasedLottoList(this.lottoList.length);
    renderLastLottoNumber();
  }

  handleClickToggleButton() {
    toggleButton();
    if ($('.purchased-lotto-main').classList.contains('is-active')) {
      console.log(this.lottoList);
      renderPurchasedLottoListContentIsActive(this.lottoList);
      return;
    }
    renderPurchasedLottoListContent(this.lottoList.length);
  }
}

new App();
