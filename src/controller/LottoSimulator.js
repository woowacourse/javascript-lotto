import Lotto from '../domain/Lotto';
import Validator from '../utils/Validator';
import { ERROR_MESSAGE, LOTTO_STRING } from '../data/constants';

class LottoSimulator {
  #lottos;
  #budget;

  constructor() {
    this.#lottos = [];
    this.#budget = 0;
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
      throw new Error(ERROR_MESSAGE.NOT_INTEGER(LOTTO_STRING.BUDGET));
    if (!budget || budget % 1000 !== 0)
      throw new Error(ERROR_MESSAGE.BUDGET_NOT_DIVISIBLE_BY_LOTTO_PRICE);
    if (budget < 1000)
      throw new Error(ERROR_MESSAGE.BUDGET_LESS_THAN_LOTTO_PRICE);
  }

  // 당첨 번호: [1,2,3,4,5,6] 보너스 넘버:7, 로또 번호: [1,2,3,4,5,6]
  // {first: 1, second: 2, third: 1, ...}
  calculateResult() {}
}

export default LottoSimulator;
