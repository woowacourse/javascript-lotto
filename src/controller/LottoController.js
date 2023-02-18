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

    const hasError = errorChecker(() => validatePurchaseAmount(purchaseAmount));
    if (hasError) return this.enterPurchaseAmount();

    this.purchaseLottos(purchaseAmount);
  }

  purchaseLottos(purchaseAmount) {
    // 로또를 발행함
    this.#game.purchaseLottos(purchaseAmount);
    printLottoInfo(this.#game.getLottoNumbers());
  }

  async enterWinningNumber() {
    const inputNumbers = await inputWinningNumber();
    const winningNumber = inputNumbers.split(',').map(Number);

    const hasError = errorChecker(() => validateWinningNumbers(winningNumber));
    if (hasError) return this.enterWinningNumber();

    await this.enterBonusNumber(winningNumber);
  }

  async enterBonusNumber(winNumber) {
    const inputNumber = await inputBonusNumber();
    const bonusNumber = Number(inputNumber);

    const hasError = errorChecker(() =>
      validateBonusNumber(bonusNumber, winNumber)
    );
    if (hasError) return this.enterBonusNumber(winNumber);

    this.#game.registerGameBoard(winNumber, bonusNumber);
  }

  printWinningResult() {
    // 게임 결과를 출력함
    const winCount = this.#game.getLottosWinCount();
    printWinningResult(winCount);

    const rate = this.#game.getEarningRate();
    printWinningStatistics(rate);
  }

  async readWhetherToRestart() {
    // 재시작 여부를
    const isRestart = await inputWhetherToRestart();

    const hasError = errorChecker(() => validateRestartInput(isRestart));
    if (hasError) this.readWhetherToRestart();

    if (isRestart === NO) return IO.close();
    this.reStart();
  }

  reStart() {
    this.#game = new LottoGame();
    this.start();
  }
}

export default LottoController;
