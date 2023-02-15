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

class LottoController {
  #purchaseAmount;
  #game;

  constructor() {
    this.init();
  }

  init() {
    this.#game = new LottoGame();
    this.readPurchaseAmount();
  }

  async readPurchaseAmount() {
    const purchaseAmount = await inputPurchaseAmount();
    this.#purchaseAmount = purchaseAmount;

    this.#game.initializeLottos(purchaseAmount);

    this.printLottoInfo();
  }

  printLottoInfo() {
    const orderedLottos = this.#game.getOrderedLottos();

    outputLottoInfo(orderedLottos);

    this.readWinningNumber();
  }

  async readWinningNumber() {
    const winningNumber = await inputWinningNumber();

    this.#game.initializeWin(winningNumber.split(',').map(Number));
    this.readBonusNumber();
  }

  async readBonusNumber() {
    const bonusNumber = await inputBonusNumber();

    this.#game.setBonusNumber(Number(bonusNumber));

    this.printWinningResult();
  }

  printWinningResult() {
    this.#game.setLottoRank();
    const winCount = {
      5: 0,
      4: 0,
      3: 1,
      2: 0,
      1: 0,
    };

    outputWinningResult(winCount);
    outputWinningStatistics(62.5);

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
