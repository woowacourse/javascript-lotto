import { $ } from './utils/dom.js';
import { getLottoPrice, checkLottoPrice } from './core/checkLottoPrice.js';
import { getLastWinnginNumbers } from './core/checkLastWinningNumbers.js';
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
    $('.lotto-price-input-form').addEventListener(
      'submit',
      this.handleSubmitPriceInput.bind(this),
    );
    $('.lotto-price-input-form').addEventListener(
      'submit',
      this.handleDrawLotto.bind(this),
    );
    $('.purchased-lotto-list-container').addEventListener(
      'click',
      this.handleClickToggleButton.bind(this),
    );
    $('.last-lotto-winning-number-container').addEventListener(
      'click',
      this.handleOpenModal.bind(this),
    );
  }

  handleSubmitPriceInput(e) {
    e.preventDefault();
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

  handleDrawLotto(e) {
    e.preventDefault();
    if (!this.lottoPriceValid) {
      return;
    }
    this.lottoList = drawLotto(this.lottoPrice);
    renderPurchasedLottoList(this.lottoList.length);
    renderLastLottoNumber();
  }

  handleClickToggleButton(e) {
    if (!e.target.classList.contains(`onoff-switch`)) {
      return;
    }
    toggleButton();
    if ($('.purchased-lotto-main').classList.contains('is-active')) {
      renderPurchasedLottoListContentIsActive(this.lottoList);
      return;
    }
    renderPurchasedLottoListContent(this.lottoList.length);
  }

  handleOpenModal(e) {
    if (!e.target.classList.contains(`check-result-button`)) {
      return;
    }
    const lastWinningNumberList = getLastWinnginNumbers();
  }
}

new App();
