import LottoGameModel from "./models/LottoGame";
class LottoGameManager {
  constructor() {}

  #initializeGame() {
    this.lottoGameModel = new LottoGameModel();
  }

  #initializeDOM() {
    this.$chargeForm = document.querySelector("#charge-input-form");
    this.$chargeInput = document.querySelector("#charge-input");
    this.$alignConverter = document.querySelector("#align-converter");
  }

  #initializeHandler() {
    this.$chargeForm.addEventListener("submit", this.onChargeInputFormSubmit);
  }

  onChargeInputFormSubmit = (e) => {
    e.preventDefault();
    try {
      const { value: chargeInputStr } = this.$chargeInput;
      const chargeInput = Number(chargeInputStr);
      const availableLottoAmount = this.lottoGameModel.inputCharge(chargeInput);
      this.lottoGameModel.createLottoList(availableLottoAmount);
    } catch (error) {
      alert(error.message);
    }
  };

  start() {
    this.#initializeGame();
    this.#initializeDOM();
    this.#initializeHandler();
  }
}
export default LottoGameManager;
