//@ts-check

import {
  EARNING_RATE_DECIMALS,
  LOTTO_PRICE,
  LOTTO_RANK,
  NO_WINNING,
  PERCENTAGE_MULTIPLIER,
} from "../lib/constants";
import { getIntersectCount } from "../../utils/lotto";

class LottoCompany {
  #winNumbers;
  #bonusNumber;

  constructor(winNumbers, bonusNumber) {
    this.#winNumbers = winNumbers;
    this.#bonusNumber = bonusNumber;
  }

  calculateLottoRanks(purchasedLottos) {
    return purchasedLottos.map((lotto) => {
      const winningLottoCount = this.#getMatchCount(
        lotto.numbers,
        this.#winNumbers
      );
      const isBonusNumber = this.#checkBonusNumber(lotto.numbers);

      const rank = this.#getRank(winningLottoCount, isBonusNumber);
      return rank;
    });
  }

  #getMatchCount(lottoNumbers, winNumbers) {
    return getIntersectCount(lottoNumbers, winNumbers);
  }

  #checkBonusNumber(lottoNumbers) {
    return lottoNumbers.includes(this.#bonusNumber);
  }

  #getRank(winningLottoCount, isBonusNumber) {
    const rank = Object.keys(LOTTO_RANK).find((currentRank) => {
      const lottoRankInfo = LOTTO_RANK[currentRank];

      return (
        lottoRankInfo.winNumber === winningLottoCount &&
        (lottoRankInfo.isBonusNumberRequired ? isBonusNumber : true)
      );
    });
    return rank ?? NO_WINNING;
  }

  calculateTotalProfit(lottoRanks) {
    return lottoRanks.reduce(
      (prev, cur) => (cur === NO_WINNING ? prev : prev + LOTTO_RANK[cur].prize),
      0
    );
  }

  calculateEarningRate(lottoCount, totalProfit) {
    const totalPurchaseAmount = lottoCount * LOTTO_PRICE;
    return (
      (totalProfit / totalPurchaseAmount) *
      PERCENTAGE_MULTIPLIER
    ).toFixed(EARNING_RATE_DECIMALS);
  }
}

export default LottoCompany;
