import Lotto from '../domain/Lotto';
import Validator from '../utils/Validator';
import { ERROR_MESSAGE, LOTTO_STRING } from '../data/constants';
import { toOrdinalNumber } from '../data/Converter';
import { RandomNumberGenerator } from '../utils/RandomNumberGenerator';

class LottoSimulator {
  #lottos;
  #winningLotto;
  #budget;

  constructor() {
    this.#lottos = [];
    this.#budget = 0;
  }

  get lottos() {
    return this.#lottos;
  }

  createLottoNumbers() {
    const lottoNumbers = new Set();
    while (lottoNumbers.size < 6) {
      lottoNumbers.add(RandomNumberGenerator.generateNumberInRange(1, 45));
    }
    // const randomNumbers = new Array(6).map(() =>
    //   RandomNumberGenerator.generateNumberInRange(1, 45)
    // );
    return Array.from(lottoNumbers);
  }

  purchaseLottos(budget) {
    this.validateBudget(budget);
    const lottoCount = budget / 1000;
    Array.from({ length: lottoCount }).forEach(() => {
      this.#lottos.push(new Lotto(this.createLottoNumbers()));
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

  calculateResult() {
    const result = {};
    Object.values(toOrdinalNumber).forEach((rank) => {
      result[rank] = 0;
    });
    this.lottos.forEach((lotto) => {
      const rank = this.#winningLotto.calculateRanking(lotto);
      result[rank] += 1;
    });
  }
}

export default LottoSimulator;

// (3개일치 -> 몇개, 4개 일치 -> 몇개... 5개일치 -> 몇개, 5개+보너스 -> 몇개, 6개 일치 -> 몇개)
// 5개 구매 => [THIRD, THIRD, SECOND, FIRST, FAIL] => Object = { FIRST: 1 SECOND: 0 THIRD: 0 }
// [FIRST,SECOND,THIRD, ]
