import { ERROR_MESSAGE, LOTTO_CONSTANT } from '../data/constants.js';
import { $, $error } from '../utils/Dom.js';
import Validator from '../utils/Validator.js';
import LottoView from '../view/LottoView.js';

class LottoDomSimulator {
  #budget;

  constructor() {
    this.#budget = 0;
    this.lottoView = new LottoView($('.budget__form'));
  }

  set budget(budget) {
    this.#budget = budget;
  }

  play() {
    this.bindProcess();
  }

  bindProcess() {
    this.lottoView.readEvent('inputPrice', (e) => this.budgetProcess(e.detail));
  }

  budgetProcess(budget) {
    try {
      this.validateBudget(+budget);
      this.budget = budget;
      this.purchaseLottos(budget);
    } catch (err) {
      this.lottoView.printErrorMessage($error, err);
    }
    this.lottoView.reset();
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
  }
}

export default LottoDomSimulator;
