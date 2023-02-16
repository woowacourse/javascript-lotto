import { ConsoleMessage, StaticValue } from '../constants/Constants.js';
import LottoGame from '../domain/LottoGame.js';
import Console from '../utils/Console.js';
import Validation from '../utils/Validation.js';
import InputView from '../view/InputView.js';
import OutputView from '../view/OutputView.js';

class LottoGameController {
  #lottoGame = new LottoGame();

  startGame() {
    this.#handlePurchaseAmount();
  }

  #handlePurchaseAmount() {
    InputView.readUserInput(ConsoleMessage.PURCHASE_AMOUNT, (input) => {
      try {
        Validation.testPurchaseAmount(input);
        const PURCHASE_COUNT = Number(input) / StaticValue.PURCHASE_AMOUNT_UNIT;
        OutputView.print(ConsoleMessage.purchaseCount(PURCHASE_COUNT));
        this.#handleUserLottos(PURCHASE_COUNT);
      } catch (error) {
        this.#handleError(error.message, this.#handlePurchaseAmount.bind(this));
      }
    });
  }

  #handleUserLottos(purchaseCount) {
    this.#lottoGame.generateUserLottos(purchaseCount);
    const USER_LOTTOS = this.#lottoGame.getUserLottos();

    USER_LOTTOS.forEach(OutputView.printUserLottos);

    this.#handleWinningNumbers();
  }

  #handleWinningNumbers() {
    InputView.readUserInput(ConsoleMessage.WINNING_NUMBER, (input) => {
      const WINNING_NUMBERS = input.split(StaticValue.INPUT_SEPARATOR).map(Number);

      try {
        Validation.testLottoNumbers(WINNING_NUMBERS);
        this.#handleBonusNumber(WINNING_NUMBERS);
      } catch (error) {
        this.#handleError(error.message, this.#handleWinningNumbers.bind(this));
      }
    });
  }

  #handleBonusNumber(winningNumbers) {
    InputView.readUserInput(ConsoleMessage.BONUS_NUMBER, (input) => {
      const BONUS_NUMBER = Number(input);
      try {
        Validation.testBonusNumber(winningNumbers, BONUS_NUMBER);
        this.#lottoGame.setGameLottos(winningNumbers, BONUS_NUMBER);
        this.#handleGameResult();
      } catch (error) {
        this.#handleError(error.message, () => this.#handleBonusNumber(winningNumbers));
      }
    });
  }

  #handleGameResult() {
    const { RANKS, PROFIT_RATE } = this.#lottoGame.getResult();
    OutputView.printResult(RANKS, PROFIT_RATE);
    this.#handleRestart();
  }

  #handleRestart() {
    InputView.readUserInput(ConsoleMessage.RESTART, (input) => {
      const REPLY = input.toLowerCase().trim();

      try {
        Validation.testRestart(REPLY);
        this.#handleRestartReply(REPLY);
      } catch (error) {
        this.#handleError(error.message, this.#handleRestart);
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

  #handleError(errorMessage, self) {
    OutputView.print(errorMessage);
    self();
  }
}

export default LottoGameController;
