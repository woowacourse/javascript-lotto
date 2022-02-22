import LottoModel from '../model/LottoModel.js';
import ResultView from '../view/resultView.js';

export default class LottoController {
  constructor() {
    this.model = new LottoModel();
    this.resultView = new ResultView();
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
      const lottoCount = this.model.getLottoCount(value);
      this.resultView.renderResult(lottoCount);
    } catch (err) {
      alert(err);
    }
  }
}
