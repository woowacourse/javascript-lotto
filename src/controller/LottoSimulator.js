import Validator from '../utils/Validator.js';
import { ERROR_MESSAGE, LOTTO_CONSTANT, LOTTO_RANKING } from '../data/constants.js';
import InputView from '../view/InputView.js';
import OutputView from '../view/OutputView.js';
import { LottoUtils } from '../domain/LottoUtils.js';

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
    InputView.readUserInput(
      ('구입금액을 입력해 주세요.',
      (budget) => {
        this.judgeValidBudget(budget);
      })
    );
  }

  judgeValidBudget(budget) {
    try {
      this.validateBudget(budget);
      this.budget = budget;
      //  next step
    } catch (err) {
      OutputView.printErrorMessage(err);
      this.inputBudget();
    }
  }

  purchaseLottos(budget) {
    const purchasedLottos = LottoUtils.createLottos(budget);
    this.#lottos = purchasedLottos;
    this.printLottos(purchasedLottos);
  }

  printLottos(purchasedLottos) {
    OutputView.printPurchaseResult(purchasedLottos);
  }

  getLottoCount() {
    return this.#lottos.length;
  }

  validateBudget(budget) {
    if (!Validator.isInteger(budget))
      throw new Error(ERROR_MESSAGE.NOT_INTEGER(LOTTO_CONSTANT.BUDGET));
    if (!budget || budget % LOTTO_CONSTANT.PRICE !== 0)
      throw new Error(ERROR_MESSAGE.BUDGET_NOT_DIVISIBLE_BY_LOTTO_PRICE);
    if (budget < LOTTO_CONSTANT.PRICE) throw new Error(ERROR_MESSAGE.BUDGET_LESS_THAN_LOTTO_PRICE);
  }

  calculateWinningResult() {
    const winningResult = {};

    Object.values(LOTTO_RANKING).forEach((rank) => (winningResult[rank] = 0));
    this.#lottos.forEach((lotto) => {
      const rank = this.#winningLotto.calculateRanking(lotto);
      winningResult[rank] += 1;
    });
    return winningResult;
  }

  reset() {
    this.#lottos = [];
    this.winningLotto = null;
    this.budget = 0;
  }
}

export default LottoSimulator;
