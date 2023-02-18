import { StaticValue, ConsoleMessage } from '../constants/Constants.js';
import LottoGame from '../domain/LottoGame.js';
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

  async #handlePurchaseAmount() {
    const PURCHASE_AMOUNT = await InputView.readUserInput(ConsoleMessage.PURCHASE_AMOUNT);
    const PURCHASE_COUNT = Number(PURCHASE_AMOUNT) / StaticValue.PURCHASE_AMOUNT_UNIT;

    try {
      Validation.testPurchaseAmount(PURCHASE_AMOUNT);
      OutputView.print(ConsoleMessage.purchaseCount(PURCHASE_COUNT));
      this.#handleUserLottos(PURCHASE_COUNT);
    } catch (error) {
      await this.#handleError(error.message, () => this.#handlePurchaseAmount());
    }

    return PURCHASE_COUNT;
  }

  #handleUserLottos(purchaseCount) {
    this.#lottoGame.generateUserLottos(purchaseCount);
    const USER_LOTTO_LIST = this.#lottoGame.getUserLottoList();

    USER_LOTTO_LIST.forEach(OutputView.printUserLottos);
  }

  async #handleWinningNumbers() {
    const WINNING_NUMBERS_INPUT = await InputView.readUserInput(ConsoleMessage.WINNING_NUMBER);
    const WINNING_NUMBERS = WINNING_NUMBERS_INPUT.split(StaticValue.INPUT_SEPARATOR).map(Number);

    try {
      Validation.testLottoNumbers(WINNING_NUMBERS);
      await this.#handleBonusNumber(WINNING_NUMBERS);
    } catch (error) {
      await this.#handleError(error.message, () => this.#handleWinningNumbers());
    }
  }

  async #handleBonusNumber(winningNumbers) {
    const BONUS_NUMBER_INPUT = await InputView.readUserInput(ConsoleMessage.BONUS_NUMBER);
    const BONUS_NUMBER = Number(BONUS_NUMBER_INPUT);

    try {
      Validation.testBonusNumber(winningNumbers, BONUS_NUMBER);
      this.#lottoGame.setGameLottos(winningNumbers, BONUS_NUMBER);
    } catch (error) {
      await this.#handleError(error.message, () => this.#handleBonusNumber(winningNumbers));
    }
  }

  #handleGameResult() {
    const { RANKS, PROFIT_RATE } = this.#lottoGame.getResult();
    OutputView.printResult(RANKS, PROFIT_RATE);
  }

  async #handleRestart() {
    const INPUT = await InputView.readUserInput(ConsoleMessage.RESTART);
    const RESPONSE = INPUT.toLowerCase().trim();

    try {
      Validation.testRestart(RESPONSE);
      this.#handleRestartReply(RESPONSE);
    } catch (error) {
      await this.#handleError(error.message, () => this.#handleRestart());
    }
  }

  #handleRestartReply(reply) {
    if (reply === StaticValue.RESTART_CONTROL) {
      this.startGame();
      return;
    }

    OutputView.close();
  }

  async #handleError(errorMessage, callback) {
    OutputView.print(errorMessage);

    return callback();
  }
}

export default LottoGameController;
