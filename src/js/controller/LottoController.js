import LottoModel from '../model/LottoModel.js';

export default class LottoController {
  constructor() {
    this.model = new LottoModel();
  }

  init() {
    this.initDOMs();
    this.bindEvent();
  }

  initDOMs() {
    this.$lottoPriceForm = document.querySelector('#lotto-price-form');
    this.$lottoPriceInput = document.querySelector('#lotto-price-input');
    this.$lottoPriceButton = document.querySelector('#lotto-price-button');
  }

  bindEvent() {
    this.$lottoPriceForm.addEventListener('submit', this.submitLottoPriceHandler.bind(this));
  }

  submitLottoPriceHandler(event) {
    event.preventDefault();

    const { value } = this.$lottoPriceInput;
    try {
      this.model.setLottoCount(value);
    } catch (err) {
      alert(err);
    }
  }
}
