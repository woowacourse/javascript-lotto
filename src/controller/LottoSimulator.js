import Lotto from '../domain/Lotto';
import Validator from '../utils/Validator';
import {
  ERROR_MESSAGE,
  LOTTO_CONSTANT,
  LOTTO_RANKING,
  MATCHES_COUNT_TO_RANKING,
  WINNING_PRIZE,
} from '../data/constants';
import { RandomNumberGenerator } from '../utils/RandomNumberGenerator';

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
    this.#budget = budget;
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

  calculateWinningResult() {
    const winningResult = {};
    // {first:0, second:0, ...}
    Object.values(LOTTO_RANKING).forEach((rank) => (winningResult[rank] = 0));
    this.#lottos.forEach((lotto) => {
      const rank = this.#winningLotto.calculateRanking(lotto);
      winningResult[rank] += 1;
    });
    return winningResult;
  }

  calculateYieldRate() {
    const winningResult = this.calculateWinningResult();

    const totalPrize = Object.keys(winningResult).reduce(
      (sum, rank) => sum + WINNING_PRIZE[rank] * winningResult[rank],
      0
    );

    return ((totalPrize / this.#budget) * 100).toFixed(1);
  }
}

export default LottoSimulator;
