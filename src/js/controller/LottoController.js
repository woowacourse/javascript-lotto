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

  initAfterRenderResult() {
    this.initDOMsAfterRenderResult();
    this.bindEventAfterRenderResult();
  }

  initDOMsAfterRenderResult() {
    this.$checkbox = document.querySelector('#view-checkbox');
  }

  bindEventAfterRenderResult() {
    this.$checkbox.addEventListener('change', this.changeCheckBoxHandler.bind(this));
  }

  submitLottoPriceHandler(event) {
    event.preventDefault();

    const { value } = this.$lottoPriceInput;
    try {
      this.model.setLottoCount(value);
      this.model.setLottos();
      const lottoCount = this.model.getLottoCount();
      this.resultView.renderResult(lottoCount);
      this.initAfterRenderResult();
    } catch (err) {
      alert(err);
    }
  }

  changeCheckBoxHandler(event) {
    const { target } = event;
    if (target.checked) {
      const lottos = this.model.getLottos();
      this.resultView.renderLottos(lottos);
      return;
    }
    this.resultView.initLottos();
  }
}
