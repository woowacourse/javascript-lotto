import { LOTTO_RANK, NO_WINNING } from '../lib/constants.js';
import { getIntersectCount } from '../lib/utils.js';

class LottoCompany {
  #winNumbers;
  #bonusNumber;

  constructor(winNumbers, bonusNumber) {
    this.#winNumbers = winNumbers;
    this.#bonusNumber = bonusNumber;
  }

  calculateLottoRanks(purchasedLottos) {
    return purchasedLottos.map((lotto) => {
      const winningLottoCount = lotto.calculateMatchWinning(this.#winNumbers);
      const isBonusNumber = lotto.includes(this.#bonusNumber);

      const rank = this.#getRank(winningLottoCount, isBonusNumber);
      return rank;
    });
  }

  #getRank(winningLottoCount, isBonusNumber) {
    const rank = Object.keys(LOTTO_RANK).find((currentRank) => {
      const lottoRankInfo = LOTTO_RANK[currentRank];

      return (
        lottoRankInfo.winNumber === winningLottoCount && (lottoRankInfo.isBonusNumberRequired ? isBonusNumber : true)
      );
    });
    return rank ?? NO_WINNING;
  }

  calculateTotalProfit(lottoRanks) {
    return lottoRanks.reduce((prev, cur) => (cur === NO_WINNING ? prev : prev + LOTTO_RANK[cur].prize), 0);
  }
}

export default LottoCompany;
