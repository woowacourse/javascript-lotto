import LottoModel from '../model/LottoModel';
import ResultView from '../view/resultView';
import InputView from '../view/inputView';

export default class LottoController {
  constructor() {
    this.lottoModel = new LottoModel();
    this.resultView = new ResultView();
    this.inputView = new InputView();
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
    this.$lottoPriceForm.addEventListener('submit', this.handleLottoPriceButtonSubmit.bind(this));
  }

  initAfterRenderResult() {
    this.initDOMsAfterRenderResult();
    this.bindEventAfterRenderResult();
  }

  initDOMsAfterRenderResult() {
    this.$checkbox = document.querySelector('#view-checkbox');
  }

  bindEventAfterRenderResult() {
    this.$checkbox.addEventListener('change', this.handleCheckBoxChange.bind(this));
  }

  handleLottoPriceButtonSubmit(event) {
    event.preventDefault();

    const lottoPriceInput = this.$lottoPriceInput.value;
    try {
      this.lottoModel.buyLottos(lottoPriceInput);

      this.resultView.renderResult(this.lottoModel.getLottoCount());
      this.initAfterRenderResult();
      this.inputView.renderWinningNumbersInput();
    } catch (err) {
      alert(err);
    }
  }

  handleCheckBoxChange({ target }) {
    if (target.checked) {
      this.resultView.renderLottos(this.lottoModel.getLottos());
      return;
    }
    this.resultView.initLottos();
  }
}
