import LottoBoard from "./LottoBoard.js";
import LottoSeller from "./LottoSeller";

class LottoResult {
  static PRIZE_OF_LOTTO = {
    1: 2_000_000_000,
    2: 30_000_000,
    3: 1_500_000,
    4: 50_000,
    5: 5_000,
    0: 0,
  };

  #rankCounts = new Array(LottoBoard.LAST_RANK + 1).fill(0);

  #numberOfLotto = 0;

  countRank(rank) {
    this.#rankCounts[rank] += 1;
    this.#numberOfLotto += 1;
  }

  getRankCounts() {
    return [...this.#rankCounts];
  }

  getProfitRate() {
    const profit = this.#getProfit();
    const totalPrice = this.#numberOfLotto * LottoSeller.LOTTO_PRICE;
    const profitRate = (profit / totalPrice) * 100;

    return profitRate;
  }

  #getProfit() {
    return Array.from({ length: this.#rankCounts.length })
      .map((_, index) => index)
      .reduce(
        (profit, rank) =>
          profit + this.#rankCounts[rank] * LottoResult.PRIZE_OF_LOTTO[rank],
        0
      );
  }
}

export default LottoResult;
