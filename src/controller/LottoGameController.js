import { ConsoleMessage } from "../constants/Constants.js";
import LottoGame from "../domain/LottoGame.js";
import Validation from "../utils/Validation.js";
import InputView from "../view/InputView.js";
import OutputView from "../view/OutputView.js";

class LottoGameController {
  #lottoGame = new LottoGame();

  async setupGame() {
    await this.#handlePurchaseAmount();
    this.#handleUserLottos();
    await this.#handleWinningNumbers();
  }

  async #handlePurchaseAmount() {
    const PURCHASE_AMOUNT = await InputView.readPurchaseAmount();

    try {
      Validation.checkPurchaseAmount(PURCHASE_AMOUNT);
      const PURCHASE_COUNT = Number(PURCHASE_AMOUNT) / 1000;
      this.#lottoGame.generateUserLottos(PURCHASE_COUNT);
      OutputView.print(ConsoleMessage.purchaseCount(PURCHASE_COUNT));
    } catch (error) {
      this.#rerequestInput(error.message, this.#handlePurchaseAmount);
    }
  }

  #handleUserLottos() {
    const USER_LOTTOS = this.#lottoGame.getUserLottos();

    USER_LOTTOS.forEach(OutputView.printUserLottos);
  }

  async #handleWinningNumbers() {
    const WINNING_NUMBERS_INPUT = await InputView.readWinningNumbers();
    const WINNING_NUMBERS = WINNING_NUMBERS_INPUT.split(',').map(Number);

    try {
      Validation.checkLottoNumber(WINNING_NUMBERS);
      this.#lottoGame.setWinningNumbers(WINNING_NUMBERS);
    } catch (error) {
      this.#rerequestInput(error.message, this.#handleWinningNumbers)
    }
  }

  #rerequestInput(errorMessage, itself) {
    OutputView.print(errorMessage);
    return itself();
  }
}

export default LottoGameController;
