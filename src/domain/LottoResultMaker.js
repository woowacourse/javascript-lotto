import LottoSeller from "./LottoSeller.js";

import {
  LOTTO_RANK_INITIAL_RESULT,
  LOTTO_RANK_TO_PRIZE,
} from "../constants/lotto.js";

class LottoResultMaker {
  static arrangeRankResult(ranks) {
    return ranks.reduce((result, rank) => {
      const COUNT_INCREMENT = 1;
      result[rank] += COUNT_INCREMENT;

      return result;
    }, this.#getInitialRankResult());
  }

  static calculateProfitRate(ranks) {
    const rankResult = this.getRankResult(ranks);
    const lottoCount = ranks.length;

    const prizeAmount = this.#sumPrizeAmount(rankResult);
    const purchaseAmount = lottoCount * LottoSeller.LOTTO_PRICE;

    return (prizeAmount / purchaseAmount) * 100;
  }

  static #getInitialRankResult() {
    return { ...LOTTO_RANK_INITIAL_RESULT };
  }

  static #sumPrizeAmount(rankResult) {
    const ranks = Object.keys(rankResult);

    return ranks.reduce((prizeTotal, rank) => {
      const rankCount = rankResult[rank];
      const prizeAmount = LOTTO_RANK_TO_PRIZE[rank] * rankCount;

      return prizeTotal + prizeAmount;
    }, 0);
  }
}

export default LottoResultMaker;
