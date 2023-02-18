import RandomNumberGenerator from '../utils/RandomNumberGenerator.js';
import { LOTTO_CONSTANT, WINNING_PRIZE } from '../data/constants.js';

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

  calculateYieldRate(winningResult, budget) {
    const totalPrize = Object.keys(winningResult).reduce(
      (sum, rank) => sum + WINNING_PRIZE[rank] * winningResult[rank],
      0
    );
    return ((totalPrize / budget) * 100).toFixed(1);
  },
};

export default LottoUtils;
