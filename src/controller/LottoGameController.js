import LottoGame from "../domain/LottoGame.js";
import Validation from "../utils/Validation.js";
import InputView from "../view/InputView.js";
import Outputview from "../view/OutputView.js";

class LottoGameController {
  #lottoGame = new LottoGame();

  async setupGame() {
    await this.#requestPurchaseAmount();
  }

  async #requestPurchaseAmount() {
    const PURCHASE_AMOUNT = await InputView.readPurchaseAmount();

    try {
      Validation.checkPurchaseAmount(PURCHASE_AMOUNT);
      this.#lottoGame.generateUserLottos(PURCHASE_AMOUNT / 1000);
    } catch (error) {
      Outputview.print(error.message);
      return this.setupGame();
    }
  }
}

export default LottoGameController;
