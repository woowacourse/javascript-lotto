import {
  inputPurchaseAmount,
  inputWinningNumber,
  inputBonusNumber,
  inputWhetherToRestart,
} from '../view/InputView';
import LottoGame from '../domain/LottoGame';
import IO from '../utils/IO';
import {
  outputLottoInfo,
  outputWinningResult,
  outputWinningStatistics,
} from '../view/OutputView';
import {
  isValidateValue,
  validatePurchaseAmount,
  validateWinningNumbers,
} from '../utils/validator';
class LottoController {
  #game;

  constructor() {
    this.init();
  }

  init() {
    this.#game = new LottoGame();
    this.readPurchaseAmount();
  }

  async readPurchaseAmount() {
    const inputAmount = await inputPurchaseAmount();
    const purchaseAmount = Number(inputAmount);
    const isValidate = isValidateValue(() =>
      validatePurchaseAmount(purchaseAmount)
    );

    if (!isValidate) return this.readPurchaseAmount();
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
    const isValidate = isValidateValue(() =>
      validateWinningNumbers(winningNumber)
    );

    if (!isValidate) return this.readWinningNumber();

    this.#game.initializeWin(winningNumber);

    this.readBonusNumber();
  }

  async readBonusNumber() {
    const bonusNumber = await inputBonusNumber();
    this.#game.setBonusNumber(Number(bonusNumber));

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

    // validation
    if (isRestart === 'n') {
      IO.close();
      return;
    }

    this.init();
  }
}

export default LottoController;
