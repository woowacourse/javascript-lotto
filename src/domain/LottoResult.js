import Rank from "./Rank.js";

class LottoResult {
  #rankCounts;

  constructor(lottos, winningNumber) {
    this.#rankCounts = this.#calculateRankCounts(lottos, winningNumber);
  }

  #calculateRankCounts(lottos, winningNumber) {
    const counts = new Map(Rank.order.map((rank) => [rank, 0]));

    lottos.forEach((lotto) => {
      const result = winningNumber.getResult(lotto);
      const rank = Rank.getRank(result);

      if (counts.has(rank)) {
        counts.set(rank, counts.get(rank) + 1);
      }
    });

    return counts;
  }

  getRankCount(rank) {
    return this.#rankCounts.get(rank) ?? 0;
  }

  getPrizeList() {
    return Rank.order.map((rank) => ({
      rank,
      count: this.#rankCounts.get(rank) ?? 0,
      prize: rank.getPrize(),
    }));
  }

  getProfitRate(purchaseAmount) {
    const totalPrize = [...this.#rankCounts.entries()].reduce(
      (acc, [rank, count]) => acc + rank.getPrize() * count,
      0,
    );
    return ((totalPrize / purchaseAmount) * 100).toFixed(1);
  }
}

export default LottoResult;
