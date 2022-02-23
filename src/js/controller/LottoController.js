import LottoModel from '../model/LottoModel.js';
import ResultView from '../view/resultView.js';
import InputView from '../view/inputView.js';
import PopupView from '../view/PopupView.js';

export default class LottoController {
  constructor() {
    this.model = new LottoModel();
    this.resultView = new ResultView();
    this.inputView = new InputView();
    this.popupView = new PopupView();
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
    this.$popup = document.querySelector('#popup');
  }

  bindEvent() {
    this.$lottoPriceForm.addEventListener('submit', this.submitLottoPriceHandler.bind(this));
    this.$result.addEventListener('click', this.clickCheckResultButtonHandler.bind(this));
    this.$popup.addEventListener('click', this.clickClosePopupButtonHandler.bind(this));
    this.$popup.addEventListener('click', this.clickRestartButtonHandler.bind(this));
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

  unbindEvent() {
    this.$checkbox.removeEventListener('change', this.changeCheckBoxHandler.bind(this));
  }

  submitLottoPriceHandler(event) {
    event.preventDefault();

    const { value } = this.$lottoPriceInput;
    try {
      this.model.setLottoCount(value);
      this.model.setLottos(this.model.generateLottos());
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
      const winningType = this.model.calculateWinningNumbers();
      const earningRate = this.model.calculateEarningRate();
      this.popupView.renderPopup(winningType, earningRate);
      this.popupView.toggleMainContainerState();
    } catch (err) {
      alert(err);
    }
  }

  clickClosePopupButtonHandler({ target }) {
    if (target.id !== 'close-popup-button') return;
    this.model.initWinningType();
    this.popupView.toggleMainContainerState();
    this.popupView.closePopup();
  }

  clickRestartButtonHandler({ target }) {
    if (target.id !== 'restart-button') return;
    this.popupView.toggleMainContainerState(); //중복 처리해야됨
    this.popupView.closePopup();
    this.inputView.initLottoPriceInput();
    this.resultView.initResult();
    this.model.initGame();
    this.unbindEvent();
  }
}
