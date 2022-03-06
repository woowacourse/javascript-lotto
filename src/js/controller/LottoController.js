import LottoModel from '../model/LottoModel';
import ResultView from '../view/resultView';
import InputView from '../view/inputView';
import PopupView from '../view/PopupView';
import { LOTTO_NUMBERS } from '../constants';
import CheckBoxView from '../view/checkboxView';
import { $$ } from '../utils/selector';

export default class LottoController {
  constructor() {
    this.model = new LottoModel();
    this.resultView = new ResultView();
    this.inputView = new InputView();
    this.popupView = new PopupView();
  }

  init() {
    this.inputView.bindLottoPriceFormSubmitEvent(this.submitLottoPriceHandler.bind(this));
    this.resultView.bindResultButtonEvent(this.submitCheckResultButtonHandler.bind(this));
    this.popupView.bindPopupEvent(this.clickClosePopupButtonHandler.bind(this));
    this.popupView.bindPopupEvent(this.clickRestartButtonHandler.bind(this));
  }

  initAfterRenderResult() {
    this.checkBoxView = new CheckBoxView();
    this.checkBoxView.bindCheckBoxEvent(this.changeCheckBoxHandler.bind(this));
  }

  closePopupHandler() {
    this.popupView.toggleMainContainerState();
    this.popupView.closePopup();
  }

  initLottoGame() {
    this.inputView.initLottoPriceInput();
    this.resultView.initResult();
    this.model.initGame();
  }

  submitLottoPriceHandler(event, value) {
    event.preventDefault();

    try {
      this.model.buyLottos(value);

      this.resultView.renderResult(this.model.getLottoCount());
      this.inputView.renderWinningNumbersInput();
      this.inputView.blockLottoPriceForm();
      this.initAfterRenderResult();
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
    this.inputView.openLottoPriceForm();
  }
}
