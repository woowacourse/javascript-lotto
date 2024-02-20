import InputView from "../view/InputView.js";

class LottoGameController {
  #inputView;

  constructor() {
    this.#inputView = InputView;
  }

  async getGameInfo() {
    const puchaseAmount = await this.#inputView.inputPurchaseAmount();
    console.log(puchaseAmount);
  }
}

export default LottoGameController;
