import { LOTTO_CONSTANT, WINNING_PRIZE } from '../data/constants.js';

const LottoUtils = {
  createLottoNumbers() {
    const lottoNumbers = new Array(LOTTO_CONSTANT.MAX_NUMBER).fill().map((_, index) => index + 1);
    lottoNumbers.sort(() => Math.random() - 0.5);
  
    return lottoNumbers.slice(0, LOTTO_CONSTANT.LENGTH);
  },

  calculateYieldRate(winningResult, lottoCount) {
    const totalPrize = Object.keys(winningResult).reduce(
      (sum, rank) => sum + WINNING_PRIZE[rank] * winningResult[rank],
      0
    );
    return ((totalPrize / (LOTTO_CONSTANT.PRICE * lottoCount)) * 100).toFixed(1);
  },
};

export default LottoUtils;
