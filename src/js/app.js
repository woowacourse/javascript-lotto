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
    this.$chargeForm.addEventListener('submit', this.onChargeInputFormSubmit);
  }

  onChargeInputFormSubmit = (e) => {
    e.preventDefault();
    try {
      const { value: chargeInputStr } = this.$chargeInput;
      const chargeInput = Number(chargeInputStr);
      // 모델을 변경했다.
      this.lottoGameModel.createLottoList(chargeInput);

      // 뷰를 변경한다.
      const lottoList = this.lottoGameModel.getLottoList();
      this.lottoGameView.renderLottoList(lottoList);
    } catch ({ message }) {
      alert(message);
    }
  };

  start() {
    this.#initializeGame();
    this.#initializeDOM();
    this.#initializeHandler();
  }
}
export default LottoGameManager;
