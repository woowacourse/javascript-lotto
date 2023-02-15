import LottoGame from "../domain/LottoGame.js";
import Validation from "../utils/Validation.js";
import InputView from "../view/InputView.js";
import OutputView from "../view/OutputView.js";

class LottoGameController {
  #lottoGame = new LottoGame();

  async setupGame() {
    await this.#requestPurchaseAmount();
    this.#handleUserLottos()
  }

  async #requestPurchaseAmount() {
    const PURCHASE_AMOUNT = await InputView.readPurchaseAmount();

    try {
      Validation.checkPurchaseAmount(PURCHASE_AMOUNT);
      this.#lottoGame.generateUserLottos(PURCHASE_AMOUNT / 1000);
    } catch (error) {
      OutputView.print(error.message);
      return this.setupGame();
    }
  }

  #handleUserLottos() {
    const USER_LOTTOS = this.#lottoGame.getUserLottos();

    USER_LOTTOS.forEach(OutputView.printUserLottos);
  }
}

export default LottoGameController;
