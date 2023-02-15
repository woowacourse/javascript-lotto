import { ConsoleMessage } from "../constants/Constants.js";
import LottoGame from "../domain/LottoGame.js";
import Validation from "../utils/Validation.js";
import InputView from "../view/InputView.js";
import OutputView from "../view/OutputView.js";

class LottoGameController {
  #lottoGame = new LottoGame();

  startGame() {
    this.#handlePurchaseAmount();
  }

  #handlePurchaseAmount() {
    InputView.readPurchaseAmount((input) => {
      try {
        Validation.checkPurchaseAmount(input);
        const PURCHASE_COUNT = Number(input) / 1000;
        this.#lottoGame.generateUserLottos(PURCHASE_COUNT);
        OutputView.print(ConsoleMessage.purchaseCount(PURCHASE_COUNT));
        this.#handleUserLottos();
      } catch (error) {
        OutputView.print(error.message);
        this.#handlePurchaseAmount();
      }
    });
  }

  #handleUserLottos() {
    const USER_LOTTOS = this.#lottoGame.getUserLottos();

    USER_LOTTOS.forEach(OutputView.printUserLottos);

    this.#handleWinningNumbers();
  }

  #handleWinningNumbers() {
    InputView.readWinningNumbers((input) => {
      const WINNING_NUMBERS = input.split(",").map(Number);

      try {
        Validation.checkLottoNumber(WINNING_NUMBERS);
        this.#handleBonusNumber(WINNING_NUMBERS);
      } catch (error) {
        OutputView.print(error.message);
        this.#handleWinningNumbers();
      }
    });
  }

  #handleBonusNumber(winningNumbers) {
    InputView.readBonusNumber((input) => {
      const BONUS_NUMBER = Number(input);

      try {
        Validation.checkBonusNumber(winningNumbers, BONUS_NUMBER);
        this.#lottoGame.setGameLottos(winningNumbers, BONUS_NUMBER);
      } catch (error) {
        OutputView.print(error.message);
        this.#handleBonusNumber(winningNumbers);
      }
    });
  }
}

export default LottoGameController;
