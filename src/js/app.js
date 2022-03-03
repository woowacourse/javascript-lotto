import { $, $body } from './utils/dom.js';

import { getLottoPrice, checkLottoPrice } from './core/checkLottoPrice.js';
import {
  getLastWinningNumbers,
  checkLastWinningNumberList,
} from './core/checkWinningNumbers.js';

import { drawLotto } from './core/drawLotto.js';
import { setResultModal } from './core/setResultModal.js';

import {
  renderBoughtLottoList,
  renderLastLottoNumber,
  renderOpenResultModal,
} from './views/render.js';

import { handleClick } from './event/handleClick.js';

export default class App {
  constructor() {
    this.handleEvent();
    this.lottoPrice = 0;
    this.lottoPriceValid = false;
    this.lottoList = [];
    this.winningNumberList = [];
  }

  handleEvent() {
    $body.addEventListener('click', handleClick.bind(this));
    //$body.addEventListener('submit', handleClick.bind(this));

    $('.lotto-price-input-form').addEventListener(
      'submit',
      this.handleSubmitPriceInput.bind(this),
    );
    $('.lotto-price-input-form').addEventListener(
      'submit',
      this.handleDrawLotto.bind(this),
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
    renderBoughtLottoList(this.lottoList.length);
    renderLastLottoNumber();
  }

  handleOpenResultModal(e) {
    if (!e.target.classList.contains(`check-result-button`)) {
      return;
    }
    const winningNumberList = checkWinningNumberList(getWinningNumbers());
    if (!winningNumberList) {
      return;
    }
    this.winningNumberList = winningNumberList;
    renderOpenResultModal(
      setResultModal(this.lottoList, this.winningNumberList),
    );
  }
}

new App();
