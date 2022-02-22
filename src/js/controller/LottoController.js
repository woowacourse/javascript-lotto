import LottoModel from '../model/LottoModel.js';
import ResultView from '../view/resultView.js';
import InputView from '../view/inputView.js';

export default class LottoController {
  constructor() {
    this.model = new LottoModel();
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
    this.$result = document.querySelector('#result');
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
    this.$result.addEventListener('click', this.clickCheckResultButtonHandler.bind(this));
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
      this.inputView.renderWinningNumbersInput();
    } catch (err) {
      alert(err);
    }
  }

  changeCheckBoxHandler({ target }) {
    if (target.checked) {
      const lottos = this.model.getLottos();
      this.resultView.renderLottos(lottos);
      return;
    }
    this.resultView.initLottos();
  }

  clickCheckResultButtonHandler({ target }) {
    if (target.id !== 'check-result-button') return;

    const $winningNumberInputs = document.querySelectorAll('.winning-number-input');
    const $bonusNumberInput = document.querySelector('.bonus-number-input');

    const winnerNumberArray = Array.from($winningNumberInputs).map(($winningNumberInput) =>
      Number($winningNumberInput.value),
    );
    const bonusNumber = Number($bonusNumberInput.value);

    try {
      this.model.setWinningLottoNumbers(winnerNumberArray, bonusNumber);
    } catch (err) {
      alert(err);
    }
  }
}
