import Lotto from '../domain/Lotto';
import { RandomNumberGenerator } from '../utils/RandomNumberGenerator';
import { LOTTO_CONSTANT, WINNING_PRIZE } from '../data/constants';

const LottoUtils = {
  createNumbers() {
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
  },

  createLottos(budget) {
    const lottoCount = budget / LOTTO_CONSTANT.PRICE;
    return Array.from({ length: lottoCount }).map(() => new Lotto(this.createNumbers()));
  },

  calculateYieldRate(winningResult) {
    const totalPrize = Object.keys(winningResult).reduce(
      (sum, rank) => sum + WINNING_PRIZE[rank] * winningResult[rank],
      0
    );

    return ((totalPrize / this.#budget) * 100).toFixed(1);
  },
};

export { LottoUtils };
