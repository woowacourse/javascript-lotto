import Lotto from '../domain/Lotto';
import Validator from '../utils/Validator';
import { ERROR_MESSAGE } from '../data/constants';

class LottoSimulator {
  #lottos;

  constructor() {
    this.#lottos = [];
  }

  get lottos() {
    return this.#lottos;
  }

  purchaseLottos(budget) {
    this.validateBudget(budget);
    const lottoCount = budget / 1000;
    Array.from({ length: lottoCount }).forEach(() => {
      this.#lottos.push(new Lotto([1, 2, 3, 4, 5, 6]));
    });
  }

  validateBudget(budget) {
    if (!Validator.isInteger(budget))
      throw new Error(ERROR_MESSAGE.BUDGET_NOT_INTEGER);
    if (!budget || budget % 1000 !== 0)
      throw new Error(ERROR_MESSAGE.BUDGET_NOT_DIVISIBLE_BY_LOTTO_PRICE);
    if (budget < 1000)
      throw new Error(ERROR_MESSAGE.BUDGET_LESS_THAN_LOTTO_PRICE);
  }
}

export default LottoSimulator;
