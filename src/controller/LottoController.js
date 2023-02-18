import {
  inputPurchaseAmount,
  inputWinningNumber,
  inputBonusNumber,
  inputWhetherToRestart,
} from '../view/InputView';
import {
  printLottoInfo,
  printWinningResult,
  printWinningStatistics,
} from '../view/OutputView';
import {
  validateBonusNumber,
  validatePurchaseAmount,
  validateWinningNumbers,
  validateRestartInput,
} from '../utils/validator';
import { NO } from '../data/Constants';
import LottoGame from '../domain/LottoGame';
import IO from '../utils/IO';

class LottoController {
  #game;

  constructor() {
    this.#game = new LottoGame();
  }

  async start() {
    await this.enterPurchaseAmount();
    await this.enterWinningNumber();
    this.printWinningResult();
    await this.readWhetherToRestart();
  }

  async enterPurchaseAmount() {
    const inputAmount = await inputPurchaseAmount();
    const purchaseAmount = Number(inputAmount);

    const hasError = this.enterErrorChecker(() =>
      validatePurchaseAmount(purchaseAmount)
    );
    if (hasError) return this.enterPurchaseAmount();

    this.purchaseLottos(purchaseAmount);
  }

  purchaseLottos(purchaseAmount) {
    this.#game.purchaseLottos(purchaseAmount);
    printLottoInfo(this.#game.getLottoNumbers());
  }

  async enterWinningNumber() {
    const inputNumbers = await inputWinningNumber();
    const winningNumber = inputNumbers.split(',').map(Number);

    const hasError = this.enterErrorChecker(() =>
      validateWinningNumbers(winningNumber)
    );
    if (hasError) return this.enterWinningNumber();

    await this.enterBonusNumber(winningNumber);
  }

  async enterBonusNumber(winNumber) {
    const inputNumber = await inputBonusNumber();
    const bonusNumber = Number(inputNumber);

    const hasError = this.enterErrorChecker(() =>
      validateBonusNumber(bonusNumber, winNumber)
    );
    if (hasError) return this.enterBonusNumber(winNumber);

    this.#game.registerGameBoard(winNumber, bonusNumber);
  }

  printWinningResult() {
    const winCount = this.#game.getLottosWinCount();
    printWinningResult(winCount);

    const rate = this.#game.getEarningRate();
    printWinningStatistics(rate);
  }

  async readWhetherToRestart() {
    const continueAnswer = await inputWhetherToRestart();

    const hasError = this.enterErrorChecker(() =>
      validateRestartInput(continueAnswer)
    );
    if (hasError) this.readWhetherToRestart();

    this.end(continueAnswer);
  }

  end(continueAnswer) {
    if (continueAnswer === NO) {
      IO.close();
      return;
    }

    this.reStart();
  }

  reStart() {
    this.#game = new LottoGame();
    this.start();
  }

  enterErrorChecker(validator) {
    try {
      validator();
    } catch (error) {
      IO.output(error);
      return true;
    }

    return false;
  }
}

export default LottoController;
