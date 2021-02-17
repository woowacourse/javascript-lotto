import LottoView from './LottoView.js';
import { NUMBERS } from './constants.js';

export default class LottoController {
  init() {
    this.lottoView = new LottoView();
    this.lottoView.init();
    this.bindEvents();
  }

  bindEvents() {
    this.lottoView.inputPriceView
      .querySelector('#input-price-btn')
      .addEventListener('click', () => this.inputPriceHandler());
  }

  inputPriceHandler() {
    const inputPrice = this.lottoView.inputPriceView.querySelector(
      '#input-price'
    ).value;

    const lottoCount = Math.floor(inputPrice / NUMBERS.LOTTO_UNIT);
    this.lottoView.showLottoView();
    this.lottoView.renderTotalLottoCount(lottoCount);
    this.lottoView.renderLottoIcons(lottoCount);
  }
}
