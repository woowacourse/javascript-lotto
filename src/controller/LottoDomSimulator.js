import Validator from '../utils/Validator.js';
import { ERROR_MESSAGE, LOTTO_CONSTANT, LOTTO_RANKING, PRINT_MESSAGE } from '../data/constants.js';
import LottoUtils from '../domain/LottoUtils.js';
import Lotto from '../domain/Lotto.js';
import WinningLotto from '../domain/WinningLotto.js';
import {
  $budgetForm,
  $budgetError,
  $ticketsList,
  $totalBudget,
  $winningForm,
  $winningError,
  $retry,
} from '../utils/Dom.js';
import BudgetView from '../view/BudgetView.js';
import WinningView from '../view/WinningView.js';
import ResultView from '../view/ResultView.js';

class LottoDomSimulator {
  #lottos;
  #winningLotto;
  #budget;

  constructor() {
    this.#lottos = [];
    this.#budget = 0;
    this.budgetView = new BudgetView($budgetForm);
    this.winningView = new WinningView($winningForm);
    this.resultView = new ResultView($retry);
  }

  set budget(budget) {
    this.#budget = budget;
  }

  set winningLotto(winningLotto) {
    this.#winningLotto = winningLotto;
  }

  play() {
    this.bindEvent();
  }

  bindEvent() {
    this.budgetView.readEvent('inputPrice', (e) => this.budgetProcess(e.detail));
    this.winningView.readEvent('inputWinningNumber', (e) => this.winningNumberProcess(e.detail));
    this.resultView.readEvent('retryCommand', () => this.retryProcess());
  }

  budgetProcess(budget) {
    try {
      this.validateBudget(+budget);
      this.budget = budget;
      this.purchaseLottos(budget);
    } catch (err) {
      this.budgetView.print($budgetError, `${LOTTO_CONSTANT.ERROR} ${err}`);
      this.budgetView.resetInput();
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
    this.budgetView.print($totalBudget, PRINT_MESSAGE.PURCHASE_COUNT(lottoCount));

    Array.from({ length: lottoCount }).forEach(() => {
      const lottoNumbers = LottoUtils.createNumbers();
      this.printLottoNumbers(lottoNumbers);
      this.#lottos.push(new Lotto(lottoNumbers));
    });
  }

  printLottoNumbers(lottoNumbers) {
    this.budgetView.printLotto($ticketsList, `${lottoNumbers.sort((a, b) => a - b).join(', ')}`);
  }

  winningNumberProcess(winningNumbers) {
    const winningNumber = winningNumbers;
    const bonusNumber = winningNumbers.pop();

    try {
      this.#winningLotto = new WinningLotto(winningNumber, +bonusNumber);
      this.bindModalResult();
    } catch (err) {
      this.winningView.print($winningError, `${LOTTO_CONSTANT.ERROR} ${err}`);
      this.winningNumberProcess();
      this.winningView.resetInput();
    }
  }

  calculateWinningResult() {
    const winningResult = {};
    Object.values(LOTTO_RANKING).forEach((rank) => {
      winningResult[rank] = 0;
    });
    this.#lottos.forEach((lotto) => {
      const rank = this.#winningLotto.calculateRanking(lotto);
      if (rank in winningResult) winningResult[rank] += 1;
    });
    return winningResult;
  }

  bindModalResult() {
    this.resultView.openResultModal(this.calculateWinningResult(), this.#budget);
  }

  retryProcess() {
    this.#lottos = [];
    this.winningLotto = null;
    this.budget = 0;
    this.budgetView.resetPrint($totalBudget);
    this.budgetView.resetPrint($ticketsList);
    this.budgetView.resetInput();
    this.winningView.resetInput();
  }
}

export default LottoDomSimulator;
