import Lotto from '../domain/Lotto';
import Validator from '../utils/Validator';
import { ERROR_MESSAGE, LOTTO_CONSTANT, MATCHES_COUNT_TO_RANKING } from '../data/constants';
import { RandomNumberGenerator } from '../utils/RandomNumberGenerator';

class LottoSimulator {
  #lottos;
  #winningLotto;
  #budget;

  constructor() {
    this.#lottos = [];
    this.#budget = 0;
  }

  createLottoNumbers() {
    const lottoNumbers = new Set();
    while (lottoNumbers.size < LOTTO_CONSTANT.LENGTH) {
      lottoNumbers.add(
        RandomNumberGenerator.generateNumberInRange(
          LOTTO_CONSTANT.MIN_NUMBER,
          LOTTO_CONSTANT.MAX_NUMBER
        )
      );
    }
    return Array.from(lottoNumbers);
  }

  purchaseLottos(budget) {
    this.validateBudget(budget);
    const lottoCount = budget / LOTTO_CONSTANT.PRICE;
    Array.from({ length: lottoCount }).forEach(() => {
      this.#lottos.push(new Lotto(this.createLottoNumbers()));
    });
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

  calculateResult() {
    const result = {};
    Object.values(MATCHES_COUNT_TO_RANKING).forEach((rank) => (result[rank] = 0));
    this.#lottos.forEach((lotto) => {
      const rank = this.#winningLotto.calculateRanking(lotto);
      result[rank] += 1;
    });
  }
}

export default LottoSimulator;
