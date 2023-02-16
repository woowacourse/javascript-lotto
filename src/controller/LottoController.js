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
  isValidateValue,
  validateBonusNumber,
  validatePurchaseAmount,
  validateWinningNumbers,
} from '../utils/validator';
import { MAX_LOTTO_NUMBER, MIN_LOTTO_NUMBER } from '../data/Constants';
import LottoGame from '../domain/LottoGame';
import IO from '../utils/IO';

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

    this.readBonusNumber(winningNumber);
  }

  async readBonusNumber(winningNumber) {
    const inputBonusNumber = await inputBonusNumber();
    const bonusNumber = Number(inputBonusNumber);
    const isValidate = isValidateValue(() =>
      validateBonusNumber(bonusNumber, winningNumber)
    );

    if (!isValidate) return this.readBonusNumber(winningNumber);
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

    // validation
    if (isRestart === 'n') {
      IO.close();
      return;
    }

    this.init();
  }
}

export default LottoController;
