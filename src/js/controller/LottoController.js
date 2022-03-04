import { $, $$ } from '../utils/dom';

import LottoModel from '../model/LottoModel';

import ResultView from '../view/resultView';
import InputView from '../view/inputView';
import PopupView from '../view/popupView';

export default class LottoController {
  constructor() {
    this.lottoModel = new LottoModel();
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
    this.$popup = $('#popup');
    this.$result = $('#result');
  }

  bindEvent() {
    this.$lottoPriceForm.addEventListener('submit', this.handleLottoPriceButtonSubmit.bind(this));
    this.$result.addEventListener('click', this.handleResultButtonClick.bind(this));
    this.$popup.addEventListener('click', this.handleClosePopupButtonClick.bind(this));
    this.$popup.addEventListener('click', this.handleRestartButtonClick.bind(this));
  }

  unbindEvent() {
    this.$checkbox.removeEventListener('chage', this.handleCheckBoxChange.bind(this));
  }

  initAfterRenderResult() {
    this.initDOMsAfterRenderResult();
    this.bindEventAfterRenderResult();
  }

  initDOMsAfterRenderResult() {
    this.$checkbox = $('#view-checkbox');
  }

  bindEventAfterRenderResult() {
    this.$checkbox.addEventListener('change', this.handleCheckBoxChange.bind(this));
  }

  closePopupView() {
    this.popupView.toggleMainContainerState();
    this.popupView.closePopup();
  }

  initLottoGame() {
    this.inputView.initLottoPriceInput();
    this.resultView.initResult();
    this.lottoModel.initGame();
    this.unbindEvent();
  }

  handleLottoPriceButtonSubmit(event) {
    event.preventDefault();

    const lottoPriceInput = this.$lottoPriceInput.valueAsNumber;

    try {
      this.lottoModel.buyLottos(lottoPriceInput);

      this.resultView.renderResult(this.lottoModel.getLottoCount());
      this.initAfterRenderResult();
      this.inputView.renderWinningNumbersInput();
    } catch (err) {
      alert(err.message);
    }
  }

  handleCheckBoxChange({ target }) {
    if (target.checked) {
      this.resultView.renderLottos(this.lottoModel.getLottos());
      return;
    }
    this.resultView.initLottos();
  }

  handleResultButtonClick({ target }) {
    if (target.id !== 'check-result-button') return;

    const $winningNumberInputs = $$('.winning-number-input');
    const $bonusNumberInput = $('.bonus-number-input');
    const winnerNumberArray = Array.from($winningNumberInputs).map(($winnnigNumberInput) => $winnnigNumberInput.valueAsNumber);
    const bonusNumber = $bonusNumberInput.valueAsNumber;

    try {
      this.lottoModel.setWinningLottoNumbers(winnerNumberArray, bonusNumber);
      this.popupView.renderPopup(this.lottoModel.calculateWinningNumbers(), this.lottoModel.calculateEarningRate());
      this.popupView.toggleMainContainerState();
    } catch (err) {
      alert(err.message);
    }
  }

  handleClosePopupButtonClick({ target }) {
    if (target.id !== 'close-popup-button') return;
    this.lottoModel.initWinningType();
    this.closePopupView();
  }

  handleRestartButtonClick({ target }) {
    if (target.id !== 'restart-button') return;

    this.closePopupView();
    this.initLottoGame();
  }
}
