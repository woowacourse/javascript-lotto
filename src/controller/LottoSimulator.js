import Validator from '../utils/Validator.js';
import { ERROR_MESSAGE, LOTTO_CONSTANT, LOTTO_RANKING, PRINT_MESSAGE } from '../data/constants.js';
import InputView from '../view/InputView.js';
import OutputView from '../view/OutputView.js';
import { LottoUtils } from '../domain/LottoUtils.js';
import Lotto from '../domain/Lotto.js';
import WinningLotto from '../domain/WinningLotto.js';
import Console from '../utils/Console.js';

class LottoSimulator {
  #lottos;
  #winningLotto;
  #budget;

  constructor() {
    this.#lottos = [];
    this.#budget = 0;
  }

  set winningLotto(winningLotto) {
    this.#winningLotto = winningLotto;
  }

  set budget(budget) {
    this.#budget = budget;
  }

  inputBudget() {
    InputView.readUserInput(PRINT_MESSAGE.INPUT_BUDGET, (budget) => {
      this.judgeValidBudget(parseInt(budget));
    });
  }

  judgeValidBudget(budget) {
    try {
      this.validateBudget(budget);
      this.budget = budget;
      this.purchaseLottos(budget);
    } catch (err) {
      OutputView.printErrorMessage(err);
      this.inputBudget();
    }
  }

  validateBudget(budget) {
    if (!Validator.isInteger(budget))
      throw new Error(ERROR_MESSAGE.NOT_INTEGER(LOTTO_CONSTANT.BUDGET));
    if (!budget || budget % LOTTO_CONSTANT.PRICE !== 0)
      throw new Error(ERROR_MESSAGE.BUDGET_NOT_DIVISIBLE_BY_LOTTO_PRICE);
    if (budget < LOTTO_CONSTANT.PRICE) throw new Error(ERROR_MESSAGE.BUDGET_LESS_THAN_LOTTO_PRICE);
  }

  purchaseLottos(budget) {
    const lottoCount = budget / LOTTO_CONSTANT.PRICE;
    OutputView.printPurchaseCount(lottoCount);

    Array.from({ length: lottoCount }).forEach(() => {
      const lottoNumbers = LottoUtils.createNumbers();
      this.printLottoNumbers(lottoNumbers);
      this.#lottos.push(new Lotto(lottoNumbers));
    });
    this.inputWinningNumber();
  }

  printLottoNumbers(lottoNumbers) {
    OutputView.printLottoNumbers(lottoNumbers);
  }

  getLottoCount() {
    return this.#lottos.length;
  }

  inputWinningNumber() {
    InputView.readUserInput(PRINT_MESSAGE.INPUT_WINNING_NUMBER, (winningNumber) => {
      this.inputBonusNumber(winningNumber);
    });
  }

  inputBonusNumber(winningNumber) {
    InputView.readUserInput(PRINT_MESSAGE.INPUT_BONUS_NUMBER, (bonusNumber) => {
      this.judgeValidWinningNumber(winningNumber.split(',').map(Number), parseInt(bonusNumber));
    });
  }

  judgeValidWinningNumber(winningNumber, bonusNumber) {
    try {
      this.#winningLotto = new WinningLotto(winningNumber, bonusNumber);
      this.printStatisticsResult();
    } catch (err) {
      OutputView.printErrorMessage(err);
      this.inputWinningNumber();
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

  printStatisticsResult() {
    OutputView.printWinningStatistics(this.calculateWinningResult());
    OutputView.printYieldRate(
      LottoUtils.calculateYieldRate(this.calculateWinningResult(), this.#budget)
    );
    this.inputRetryCommand();
  }

  inputRetryCommand() {
    InputView.readUserInput(PRINT_MESSAGE.INPUT_RETRY, (command) => {
      this.judgeValidRetryCommand(command);
    });
  }

  judgeValidRetryCommand(command) {
    try {
      this.validateRetryCommand(command);
      if (command === 'y') this.retry();
      if (command === 'n') this.quit();
    } catch (err) {
      OutputView.printErrorMessage(err);
      this.inputRetryCommand();
    }
  }

  validateRetryCommand(command) {
    if (command !== 'y' && command !== 'n') throw new Error(ERROR_MESSAGE.RETRY_COMMAND);
  }

  retry() {
    this.#lottos = [];
    this.winningLotto = null;
    this.budget = 0;
    this.inputBudget();
  }

  quit() {
    Console.close();
  }
}

export default LottoSimulator;
