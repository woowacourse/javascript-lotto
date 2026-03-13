import Rank from "../../domain/Rank.js";
import { statistics } from "./lottoStatistics.js";

export default class LottoStatisticsUseCase {
  static ERROR = {
    ARRAY_EMPTY: "로또를 구매하셔야합니다",
  };

  static statisticsLottos(lottos, winningNumber) {
    if (!lottos?.length) {
      throw new Error(LottoStatisticsUseCase.ERROR.ARRAY_EMPTY);
    }

    const rankMap = Rank.getRankMap();
    lottos.forEach((lotto) => {
      const rank = statistics(lotto, winningNumber);
      rankMap.set(rank, { count: rankMap.get(rank).count + 1 });
    });

    const lottosResult = this.#formatRankMap(rankMap);
    const totalPrize = this.#sumPrize(lottosResult);

    return { lottosResult, totalPrize };
  }

  static #formatRankMap(rankMap) {
    return [...rankMap.entries()]
      .filter(([rank]) => rank !== Rank.CONFIG.MISS)
      .map(([rank, stat]) => ({
        ...rank,
        count: stat.count,
      }))
      .sort((a, b) => b.order - a.order);
  }

  static #sumPrize(lottosResult) {
    return lottosResult.reduce(
      (sum, { prize, count }) => sum + prize * count,
      0,
    );
  }
}
