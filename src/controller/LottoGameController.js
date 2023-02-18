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
    try {
      const purchaseAmountInput = await InputView.readUserInput(ConsoleMessage.PURCHASE_AMOUNT);
      const PURCHASE_COUNT = Number(purchaseAmountInput) / StaticValue.PURCHASE_AMOUNT_UNIT;
      Validation.verifyPurchaseAmount(purchaseAmountInput);
      OutputView.print(ConsoleMessage.purchaseCount(PURCHASE_COUNT));
      this.#handleUserLottos(PURCHASE_COUNT);
    } catch (error) {
      await this.#handleError(error.message, () => this.#handlePurchaseAmount());
    }
  }

  #handleUserLottos(purchaseCount) {
    this.#lottoGame.generateUserLottos(purchaseCount);
    const USER_LOTTO_LIST = this.#lottoGame.getUserLottoList();

    USER_LOTTO_LIST.forEach(OutputView.printUserLottos);
  }

  async #handleWinningNumbers() {
    try {
      const winningNumbersInput = await InputView.readUserInput(ConsoleMessage.WINNING_NUMBER);
      const WINNING_NUMBERS = winningNumbersInput.split(StaticValue.INPUT_SEPARATOR).map(Number);
      Validation.verifyLottoNumbers(WINNING_NUMBERS);
      await this.#handleBonusNumber(WINNING_NUMBERS);
    } catch (error) {
      await this.#handleError(error.message, () => this.#handleWinningNumbers());
    }
  }

  async #handleBonusNumber(winningNumbers) {
    try {
      const bonusNumberInput = await InputView.readUserInput(ConsoleMessage.BONUS_NUMBER);
      const BONUS_NUMBER = Number(bonusNumberInput);
      Validation.verifyBonusNumber(winningNumbers, BONUS_NUMBER);
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
    try {
      const restartInput = await InputView.readUserInput(ConsoleMessage.RESTART);
      const RESPONSE = restartInput.toLowerCase().trim();
      Validation.verifyRestart(RESPONSE);
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
