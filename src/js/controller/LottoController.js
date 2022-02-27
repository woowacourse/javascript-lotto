import LottoModel from '../model/LottoModel';
import ResultView from '../view/resultView';
import InputView from '../view/inputView';
import PopupView from '../view/PopupView';
import { $, $$ } from '../utils/selector';

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
    this.$lottoPriceForm = $('#lotto-price-form');
    this.$lottoPriceInput = $('#lotto-price-input');
    this.$lottoPriceButton = $('#lotto-price-button');
    this.$result = $('#result');
    this.$popup = $('#popup');
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
    this.$checkbox = $('#view-checkbox');
  }

  bindEventAfterRenderResult() {
    this.$checkbox.addEventListener('change', this.changeCheckBoxHandler.bind(this));
  }

  unbindEvent() {
    this.$checkbox.removeEventListener('change', this.changeCheckBoxHandler.bind(this));
  }

  closePopupHandler() {
    this.popupView.toggleMainContainerState();
    this.popupView.closePopup();
  }

  initLottoGame() {
    this.inputView.initLottoPriceInput();
    this.resultView.initResult();
    this.model.initGame();
    this.unbindEvent();
  }

  submitLottoPriceHandler(event) {
    event.preventDefault();

    try {
      this.model.buyLottos(this.$lottoPriceInput.valueAsNumber);

      this.resultView.renderResult(this.model.getLottoCount());
      this.initAfterRenderResult();
      this.inputView.renderWinningNumbersInput();
    } catch (err) {
      alert(err);
    }
  }

  changeCheckBoxHandler({ target }) {
    if (target.checked) {
      this.resultView.renderLottos(this.model.getLottos());
      return;
    }

    this.resultView.initLottos();
  }

  clickCheckResultButtonHandler({ target }) {
    if (target.id !== 'check-result-button') return;

    const $winningNumberInputs = $$('.winning-number-input');
    const $bonusNumberInput = $('.bonus-number-input');

    const winnerNumberArray = Array.from($winningNumberInputs).map(
      ($winningNumberInput) => $winningNumberInput.valueAsNumber,
    );
    const bonusNumber = $bonusNumberInput.valueAsNumber;

    try {
      this.model.calculateLottoResult(winnerNumberArray, bonusNumber);

      this.popupView.renderPopup(this.model.getLottoResultInfo());
      this.popupView.toggleMainContainerState();
    } catch (err) {
      alert(err);
    }
  }

  clickClosePopupButtonHandler({ target }) {
    if (target.id !== 'close-popup-button') return;

    this.model.initWinningType();
    this.closePopupHandler();
  }

  clickRestartButtonHandler({ target }) {
    if (target.id !== 'restart-button') return;

    this.closePopupHandler();
    this.initLottoGame();
  }
}
