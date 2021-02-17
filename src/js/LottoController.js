import LottoView from './LottoView.js';

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

    this.lottoView.showLottoView();
  }
}
