import LottoSeller from "./LottoSeller.js";

class LottoResultMaker {
  static RANK = Object.freeze({
    1: "first",
    2: "second",
    3: "third",
    4: "fourth",
    5: "fifth",
    [-1]: "none",
  });

  static PRIZE_OF_LOTTO = {
    [LottoResultMaker.RANK[-1]]: 0,
    [LottoResultMaker.RANK[5]]: 5_000,
    [LottoResultMaker.RANK[4]]: 50_000,
    [LottoResultMaker.RANK[3]]: 1_500_000,
    [LottoResultMaker.RANK[2]]: 30_000_000,
    [LottoResultMaker.RANK[1]]: 2_000_000_000,
  };

  static getLottoResult(ranks) {
    const rankResult = this.#getRankResult(ranks);
    const profitRate = this.#getProfitRate(rankResult, ranks.length);

    return { rankResult, profitRate };
  }

  static #getRankResult(ranks) {
    return ranks.reduce((result, rank) => {
      const rankPropertyKey = LottoResultMaker.RANK[rank];
      result[rankPropertyKey] += 1;
      return result;
    }, this.#getInitialRankResult());
  }

  static #getProfitRate(rankResult, lottoCount) {
    return (
      (this.#getProfitAmount(rankResult) /
        (lottoCount * LottoSeller.LOTTO_PRICE)) *
      100
    );
  }

  static #getProfitAmount(rankResult) {
    return Object.keys(rankResult).reduce(
      (total, rankKey) =>
        total + rankResult[rankKey] * LottoResultMaker.PRIZE_OF_LOTTO[rankKey],
      0
    );
  }

  static #getInitialRankResult() {
    return {
      [LottoResultMaker.RANK[1]]: 0,
      [LottoResultMaker.RANK[2]]: 0,
      [LottoResultMaker.RANK[3]]: 0,
      [LottoResultMaker.RANK[4]]: 0,
      [LottoResultMaker.RANK[5]]: 0,
      [LottoResultMaker.RANK[-1]]: 0,
    };
  }
}

export default LottoResultMaker;
