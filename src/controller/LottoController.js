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
  errorChecker,
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

  init() {
    this.#game = new LottoGame();
    this.readPurchaseAmount();
  }

  async readPurchaseAmount() {
    const inputAmount = await inputPurchaseAmount();
    const purchaseAmount = Number(inputAmount);

    const hasError = errorChecker(() => validatePurchaseAmount(purchaseAmount));
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

    this.readWinningNumber();
  }

  async readWinningNumber() {
    const inputNumbers = await inputWinningNumber();
    const winningNumber = inputNumbers.split(',').map(Number);

    const hasError = errorChecker(() => validateWinningNumbers(winningNumber));
    if (hasError) return this.readWinningNumber();

    this.setWinNumber(winningNumber);
  }

  setWinNumber(winNumber) {
    this.#game.initializeWin(winNumber);
    this.readBonusNumber(winNumber);
  }

  async readBonusNumber(winNumber) {
    const inputNumber = await inputBonusNumber();
    const bonusNumber = Number(inputNumber);

    const hasError = errorChecker(() =>
      validateBonusNumber(bonusNumber, winNumber)
    );
    if (hasError) return this.readBonusNumber();

    this.setBonusNumber(bonusNumber);
  }

  setBonusNumber(bonusNumber) {
    this.#game.setBonusNumber(bonusNumber);
    this.printWinningResult();
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

    this.readWhetherToRestart();
  }

  async readWhetherToRestart() {
    const isRestart = await inputWhetherToRestart();

    const hasError = errorChecker(() => validateRestartInput(isRestart));
    if (hasError) this.readWhetherToRestart();

    if (isRestart === NO) return IO.close();
    this.init();
  }
}

export default LottoController;
