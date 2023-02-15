import LottoGame from "../domain/LottoGame.js";
import Validation from "../utils/Validation.js";
import InputView from "../view/InputView.js";
import OutputView from "../view/OutputView.js";

class LottoGameController {
  #lottoGame = new LottoGame();

  async setupGame() {
    await this.#handlePurchaseAmount();
    this.#handleUserLottos();
  }

  async #handlePurchaseAmount() {
    const PURCHASE_AMOUNT = await InputView.readPurchaseAmount();

    try {
      Validation.checkPurchaseAmount(PURCHASE_AMOUNT);
      this.#lottoGame.generateUserLottos(PURCHASE_AMOUNT / 1000);
    } catch (error) {
      this.#rerequestInput(error.message, this.#handlePurchaseAmount);
    }
  }

  #handleUserLottos() {
    const USER_LOTTOS = this.#lottoGame.getUserLottos();

    USER_LOTTOS.forEach(OutputView.printUserLottos);
  }

  #rerequestInput(errorMessage, itself) {
    OutputView.print(errorMessage);
    return itself();
  }
}

export default LottoGameController;
