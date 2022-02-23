import LottoGameModel from './models/LottoGame';
import { SELECTOR } from './constants/selector';
import LottoGameView from './views';
import { findElement } from './utils/elementSelector';

class LottoGameManager {
  #initializeGame() {
    this.lottoGameModel = new LottoGameModel();
    this.lottoGameView = new LottoGameView();
  }

  #initializeDOM() {
    this.$chargeForm = findElement(SELECTOR.CHARGE_INPUT_FORM);
    this.$chargeInput = findElement(SELECTOR.CHARGE_INPUT);
    this.$alignConverter = findElement(SELECTOR.ALIGN_CONVERTER);
  }

  #initializeHandler() {
    this.$chargeForm.addEventListener('submit', this.onSubmitChargeInputForm);
    this.$alignConverter.addEventListener('change', this.onChangeAlignState);
  }

  onSubmitChargeInputForm = (e) => {
    e.preventDefault();
    try {
      const { value: chargeInputStr } = this.$chargeInput;
      const chargeInput = Number(chargeInputStr);
      this.triggerChargeInputAction(chargeInput);
    } catch ({ message }) {
      alert(message);
    }
  };

  triggerChargeInputAction(chargeInput) {
    // mutate model
    this.lottoGameModel.createLottoList(chargeInput);
    // mutate view by new model state
    const lottoList = this.lottoGameModel.getLottoList();
    this.lottoGameView.renderLottoSection(lottoList);
  }

  onChangeAlignState = (e) => {
    const { checked: alignState } = e.target;
    this.lottoGameView.renderAlignState(alignState);
  };

  start() {
    this.#initializeGame();
    this.#initializeDOM();
    this.#initializeHandler();
  }
}
export default LottoGameManager;
