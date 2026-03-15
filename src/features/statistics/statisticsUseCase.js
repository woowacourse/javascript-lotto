import Rank from "../../domain/Rank.js";
import StatisticsMapper from "./StatisticsMapper.js";
export default class StatisticsUseCase {
  static ERROR = {
    ARRAY_EMPTY: "로또를 구매하셔야 합니다",
  };

  #statistics(lotto, winningNumber) {
    const { matchWinning, matchBonus } = winningNumber.getMatchCount(lotto);
    const rank = Rank.findRank(matchWinning, matchBonus);
    return rank;
  }

  statisticsLottos({ lottos, winningNumber, purchasedMoney }) {
    this.#validate(lottos);
    const rankMap = Rank.getRankMap();

    lottos.forEach((lotto) => {
      const rank = this.#statistics(lotto, winningNumber);
      if (rank) {
        const currentStat = rankMap.get(rank.order);
        rankMap.set(rank.order, {
          ...currentStat,
          count: currentStat.count + 1,
        });
      }
    });

    const totalPrizeAmount = [...rankMap.values()].reduce(
      (acc, { prize, count }) => acc + prize * count,
      0,
    );

    const profitRate = purchasedMoney.calculateProfitRate(totalPrizeAmount);

    return StatisticsMapper.toResponseDto(rankMap, profitRate);
  }

  #validate(lottos) {
    if (!lottos || lottos.length === 0) {
      throw new Error(StatisticsUseCase.ERROR.ARRAY_EMPTY);
    }
  }
}
