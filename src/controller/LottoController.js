import {
  inputPurchaseAmount,
  inputWinningNumber,
  inputBonusNumber,
  inputWhetherToRestart,
} from '../view/InputView';
import {
  outputLottoInfo,
  outputWinningResult,
  outputWinningStatistics,
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

  async init() {
    this.#game = new LottoGame();
    await this.start();
  }

  async start() {
    await this.readPurchaseAmount();
    await this.readWinningNumber();
    this.printWinningResult();
    await this.readWhetherToRestart();
  }

  async readPurchaseAmount() {
    const inputAmount = await inputPurchaseAmount();
    const purchaseAmount = Number(inputAmount);

    const hasError = this.errorChecker(() =>
      validatePurchaseAmount(purchaseAmount)
    );
    if (hasError) return this.readPurchaseAmount();

    this.setLottos(purchaseAmount);
  }

  setLottos(purchaseAmount) {
    this.#game.initializeLottos(purchaseAmount);
    this.printLottoInfo();
  }

  printLottoInfo() {
    const orderedLottos = this.#game.getOrderedLottos();

    outputLottoInfo(orderedLottos);
  }

  async readWinningNumber() {
    const inputNumbers = await inputWinningNumber();
    const winningNumber = inputNumbers.split(',').map(Number);

    const hasError = this.errorChecker(() =>
      validateWinningNumbers(winningNumber)
    );
    if (hasError) return this.readWinningNumber();

    await this.setWinNumber(winningNumber);
  }

  async setWinNumber(winNumber) {
    this.#game.initializeWin(winNumber);
    await this.readBonusNumber(winNumber);
  }

  async readBonusNumber(winNumber) {
    const inputNumber = await inputBonusNumber();
    const bonusNumber = Number(inputNumber);

    const hasError = this.errorChecker(() =>
      validateBonusNumber(bonusNumber, winNumber)
    );
    if (hasError) return this.readBonusNumber();

    this.setBonusNumber(bonusNumber);
  }

  setBonusNumber(bonusNumber) {
    this.#game.setBonusNumber(bonusNumber);
  }

  printWinningResult() {
    this.#game.setLottoRank();
    const winCount = this.#game.getLottosWinCount();

    outputWinningResult(winCount);

    this.printEarningRate();
  }

  printEarningRate() {
    const rate = this.#game.calculateEarningRate();

    outputWinningStatistics(rate);
  }

  async readWhetherToRestart() {
    const isRestart = await inputWhetherToRestart();

    const hasError = this.errorChecker(() => validateRestartInput(isRestart));
    if (hasError) this.readWhetherToRestart();

    if (isRestart === NO) {
      IO.close();
      return;
    }
    this.init();
  }

  errorChecker(validator) {
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
