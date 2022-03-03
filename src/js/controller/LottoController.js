import LottoModel from '../model/LottoModel';
import ResultView from '../view/resultView';
import InputView from '../view/inputView';
import PopupView from '../view/PopupView';
import { $, $$ } from '../utils/selector';
import { LOTTO_NUMBERS } from '../constants';

export default class LottoController {
  constructor() {
    this.model = new LottoModel();
    this.resultView = new ResultView();
    this.inputView = new InputView();
    this.popupView = new PopupView();

    this.$lottoPriceForm = $('#lotto-price-form');
    this.$lottoPriceInput = $('#lotto-price-input');
    this.$lottoPriceButton = $('#lotto-price-button');
    this.$result = $('#result');
    this.$popup = $('#popup');
  }

  init() {
    this.$lottoPriceForm.addEventListener('submit', this.submitLottoPriceHandler.bind(this));
    this.$result.addEventListener('submit', this.submitCheckResultButtonHandler.bind(this));
    this.$popup.addEventListener('click', this.clickClosePopupButtonHandler.bind(this));
    this.$popup.addEventListener('click', this.clickRestartButtonHandler.bind(this));
  }

  initAfterRenderResult() {
    this.$checkbox = $('#view-checkbox');
    this.$checkbox.addEventListener('change', this.changeCheckBoxHandler.bind(this));
  }

  closePopupHandler() {
    this.popupView.toggleMainContainerState();
    this.popupView.closePopup();
  }

  initLottoGame() {
    this.inputView.initLottoPriceInput();
    this.resultView.initResult();
    this.model.initGame();
    this.$checkbox.removeEventListener('change', this.changeCheckBoxHandler.bind(this)); // 존재하는 이벤트를 해제해준다.
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

  submitCheckResultButtonHandler(e) {
    if (e.target.id !== 'winning-numbers-form') return;
    e.preventDefault();
    const $winningNumberInputs = $$('.winning-number-input');

    const winnerNumberArray = Array.from($winningNumberInputs).map(($winningNumberInput) =>
      Number($winningNumberInput.value),
    );

    try {
      this.model.calculateLottoResult(
        winnerNumberArray.slice(0, LOTTO_NUMBERS.LOTTO_LENGTH),
        winnerNumberArray[LOTTO_NUMBERS.LOTTO_LENGTH],
      );

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
