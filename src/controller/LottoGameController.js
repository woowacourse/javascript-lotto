import { ConsoleMessage, StaticValue } from "../constants/Constants.js";
import LottoGame from "../domain/LottoGame.js";
import Console from '../utils/Console.js';
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
        const PURCHASE_COUNT = Number(input) / StaticValue.PURCHASE_AMOUNT_UNIT;
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
      const WINNING_NUMBERS = input.split(StaticValue.INPUT_SEPARATOR).map(Number);

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
        this.#handleGameResult();
        this.#handleRestart();
      } catch (error) {
        OutputView.print(error.message);
        this.#handleBonusNumber(winningNumbers);
      }
    });
  }

  #handleGameResult() {
    const { RANKS, PROFIT_RATE } = this.#lottoGame.getResult();
    OutputView.print("");
    OutputView.print(ConsoleMessage.RESULT);
    OutputView.printRanks(RANKS);
    OutputView.printProfitRate(PROFIT_RATE);
  }

  #handleRestart() {
    InputView.readRestart((input) => {
      const REPLY = input.toLowerCase().trim();

      try {
        Validation.checkRestart(REPLY);
        this.#handleRestartReply(REPLY);
      } catch (error) {
        OutputView.print(error.message);
        this.#handleRestart();
      }
    });
  }

  #handleRestartReply(reply) {
    if (reply === StaticValue.RESTART_CONTROL) {
      this.startGame();
      return;
    }

    Console.close();
  }
}

export default LottoGameController;
