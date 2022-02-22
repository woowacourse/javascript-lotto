import LottoGameModel from './models/LottoGame';
import { SELECTOR } from './constants/selector';
import LottoGameView from './views';

class LottoGameManager {
  constructor() {}

  #initializeGame() {
    this.lottoGameModel = new LottoGameModel();
    this.lottoGameView = new LottoGameView();
  }

  #initializeDOM() {
    this.$chargeForm = document.querySelector(SELECTOR.CHARGE_INPUT_FORM);
    this.$chargeInput = document.querySelector(SELECTOR.CHARGE_INPUT);
    this.$alignConverter = document.querySelector(SELECTOR.ALIGN_CONVERTER);
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
      // mutate model
      this.lottoGameModel.createLottoList(chargeInput);

      // mutate view by new model state
      const lottoList = this.lottoGameModel.getLottoList();
      this.lottoGameView.renderLottoSection(lottoList);
    } catch ({ message }) {
      alert(message);
    }
  };

  onChangeAlignState = (e) => {
    const { checked } = this.$alignConverter;
    this.lottoGameView.renderAlignState(checked ? 'vertical' : 'horizon');
  };

  start() {
    this.#initializeGame();
    this.#initializeDOM();
    this.#initializeHandler();
  }
}
export default LottoGameManager;
