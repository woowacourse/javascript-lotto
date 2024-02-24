import LottoSeller from "./LottoSeller.js";
import {
  LOTTO_RANK_INITIAL_RESULT,
  LOTTO_RANK_TO_PRIZE,
} from "../constants/lotto.js";

class LottoResultMaker {
  static getRankResult(ranks) {
    return ranks.reduce((result, rank) => {
      const COUNT_INCREMENT = 1;
      result[rank] += COUNT_INCREMENT;

      return result;
    }, this.#getInitialRankResult());
  }

  static getProfitRate(rankResult, lottoCount) {
    const prizeAmount = this.#getPrizeAmount(rankResult);
    const purchaseAmount = lottoCount * LottoSeller.LOTTO_PRICE;

    return (prizeAmount / purchaseAmount) * 100;
  }

  static #getPrizeAmount(rankResult) {
    const ranks = Object.keys(rankResult);

    return ranks.reduce((prizeTotal, rank) => {
      const rankCount = rankResult[rank];
      const prizeAmount = LOTTO_RANK_TO_PRIZE[rank] * rankCount;

      return prizeTotal + prizeAmount;
    }, 0);
  }

  static #getInitialRankResult() {
    return { ...LOTTO_RANK_INITIAL_RESULT };
  }
}

export default LottoResultMaker;
