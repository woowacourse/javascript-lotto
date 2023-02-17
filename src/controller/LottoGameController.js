import { StaticValue, RequestMessage, ResultMessage } from '../constants/Constants.js';
import LottoGame from '../domain/LottoGame.js';
import Console from '../utils/Console.js';
import InputView from '../view/InputView.js';
import OutputView from '../view/OutputView.js';
import Validation from '../utils/Validation.js';

class LottoGameController {
  #lottoGame = new LottoGame();

  async startGame() {
    await this.#handlePurchaseAmount();
    await this.#handleWinningNumbers();
    this.#handleGameResult();
    await this.#handleRestart();
  }

  #handlePurchaseAmount = async () => {
    const MONEY = await InputView.readUserInput(RequestMessage.PURCHASE_AMOUNT);
    const PURCHASE_COUNT = Number(MONEY) / StaticValue.PURCHASE_AMOUNT_UNIT;

    try {
      Validation.testPurchaseAmount(MONEY);
      OutputView.print(ResultMessage.purchaseCount(PURCHASE_COUNT));
      this.#handleUserLottos(PURCHASE_COUNT);
    } catch (error) {
      await this.#handleError(error.message, this.#handlePurchaseAmount);
    }
  };

  #handleUserLottos(purchaseCount) {
    this.#lottoGame.generateUserLottos(purchaseCount);
    const USER_LOTTOS = this.#lottoGame.getUserLottos();

    USER_LOTTOS.forEach(OutputView.print);
  }

  #handleWinningNumbers = async () => {
    const WINNING_NUMBER_INPUT = await InputView.readUserInput(RequestMessage.WINNING_NUMBER);
    const WINNING_NUMBERS = WINNING_NUMBER_INPUT.split(StaticValue.INPUT_SEPARATOR).map(Number);

    try {
      Validation.testLottoNumbers(WINNING_NUMBERS);
      await this.#handleBonusNumber(WINNING_NUMBERS);
    } catch (error) {
      await this.#handleError(error.message, this.#handleWinningNumbers);
    }
  };

  #handleBonusNumber = async (winningNumbers) => {
    const BONUS_NUMBER_INPUT = await InputView.readUserInput(RequestMessage.BONUS_NUMBER);
    const BONUS_NUMBER = Number(BONUS_NUMBER_INPUT);

    try {
      Validation.testBonusNumber(winningNumbers, BONUS_NUMBER);
      this.#lottoGame.setGameLottos(winningNumbers, BONUS_NUMBER);
    } catch (error) {
      await this.#handleError(error.message, () => this.#handleBonusNumber(winningNumbers));
    }
  };

  #handleGameResult() {
    const { RANKS, PROFIT_RATE } = this.#lottoGame.getResult();
    OutputView.printResult(RANKS, PROFIT_RATE);
  }

  #handleRestart = async () => {
    const REPLY_INPUT = await InputView.readUserInput(RequestMessage.RESTART);
    const REPLY = REPLY_INPUT.toLowerCase().trim();

    try {
      Validation.testRestart(REPLY);
      this.#handleRestartReply(REPLY);
    } catch (error) {
      await this.#handleError(error.message, this.#handleRestart);
    }
  };

  #handleRestartReply(reply) {
    if (reply === StaticValue.RESTART_CONTROL) {
      this.startGame();
      return;
    }

    Console.close();
  }

  #handleError(errorMessage, self) {
    OutputView.print(errorMessage);
    return self();
  }
}

export default LottoGameController;
