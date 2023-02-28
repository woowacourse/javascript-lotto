import { LOTTO_CONSTANT, LOTTO_RANKING, PRINT_MESSAGE } from '../data/constants.js';
import InputView from '../view/console/InputView.js'; 
import OutputView from '../view/console/OutputView.js';
import LottoUtils from '../domain/LottoUtils.js';
import Lotto from '../domain/Lotto.js';
import WinningLotto from '../domain/WinningLotto.js';
import Console from '../utils/Console';

class LottoSimulator {
  #lottos;
  #winningLotto;

  constructor() {
    this.#lottos = [];
  }

  async play() {
    await this.purchaseLottos();
    this.printPurchaseResult();
    await this.inputWinningLotto();
    this.printStatistics();
    await this.requestRetryCommand();
  }

  async purchaseLottos() {
    try {
      const budget = await InputView.readUserInput(PRINT_MESSAGE.INPUT_BUDGET);
      LottoUtils.validateBudget(+budget);
      Array.from({ length: budget / LOTTO_CONSTANT.PRICE }).forEach(() => {
        this.#lottos.push(new Lotto(LottoUtils.createLottoNumbers()));
      });
    } catch (err) {
      OutputView.printErrorMessage(err);
      return this.purchaseLottos();
    }
  }

  printPurchaseResult() {
    OutputView.printPurchaseCount(this.#lottos.length);
    this.#lottos.forEach((lotto) => {
      OutputView.printLottoNumbers(lotto.numbers);
    });
  }

  async inputWinningLotto() {
    try {
      const winningNumbers = await InputView.readUserInput(PRINT_MESSAGE.INPUT_WINNING_NUMBER);
      const bonusNumber = await InputView.readUserInput(PRINT_MESSAGE.INPUT_BONUS_NUMBER);
      this.#winningLotto = new WinningLotto(winningNumbers.split(',').map(Number), +bonusNumber);
    } catch (err) {
      OutputView.printErrorMessage(err);
      return this.inputWinningLotto();
    }
  }

  calculateWinningResult() {
    const winningResult = {};

    Object.values(LOTTO_RANKING).forEach((rank) => (winningResult[rank] = 0));
    this.#lottos.forEach((lotto) => {
      const rank = this.#winningLotto.calculateRanking(lotto);
      if (rank in winningResult) winningResult[rank] += 1;
    });
    return winningResult;
  }

  printStatistics() {
    const winningResult = this.calculateWinningResult();
    OutputView.printWinningStatistics(winningResult);
    OutputView.printYieldRate(LottoUtils.calculateYieldRate(winningResult, this.#lottos.length));
  }

  async requestRetryCommand() {
    try {
      const command = await InputView.readUserInput(PRINT_MESSAGE.INPUT_RETRY);
      LottoUtils.validateRetryCommand(command);
      command === LOTTO_CONSTANT.COMMAND_RETRY ? this.retry() : this.quit();
    } catch (err) {
      OutputView.printErrorMessage(err);
      return this.requestRetryCommand();
    }
  }

  retry() {
    this.#lottos = [];
    this.winningLotto = null;
    this.play();
  }

  quit() {
    Console.close();
  }
}

export default LottoSimulator;
