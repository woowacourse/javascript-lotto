import Rank from "./Rank.js";

class LottoResult {
  #rankCounts;

  constructor(lottos, winningNumber) {
    this.#rankCounts = this.#calculateRankCounts(lottos, winningNumber);
  }

  #calculateRankCounts(lottos, winningNumber) {
    //MISS는 따로 집계 안함
    const counts = new Map(Rank.order.map((rank) => [rank, 0]));

    lottos.forEach((lotto) => {
      const result = winningNumber.getResult(lotto);
      const rank = Rank.getRank(result);

      //MISS는 Map에 없으니까 has()로 체크해서 카운트 증가
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
    //let totalPrize = 0 을 지우려다보니
    const totalPrize = [...this.#rankCounts.entries()].reduce(
      (acc, [rank, count]) => acc + rank.getPrize() * count,
      0,
    );
    return ((totalPrize / purchaseAmount) * 100).toFixed(1);
  }
}

// 목표
// - getRankCount(rank) → 특정 등수의 당첨 개수 (number)
// - getPrizeList() → 등수별 { rank, count, prize } 배열
// - getProfitRate(purchaseAmount) → 수익률 문자열

export default LottoResult;
