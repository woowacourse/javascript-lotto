import Rank from "../../domain/Rank.js";
import statisticsMapper from "./statisticsMapper.js";
import { statistics } from "./statisticsUtils.js";

export default class statisticsUseCase {
  static ERROR = {
    ARRAY_EMPTY: "로또를 구매하셔야 합니다",
  };

  static statisticsLottos(lottos, winningNumber) {
    this.#validate(lottos);
    const rankMap = Rank.getRankMap();

    lottos.forEach((lotto) => {
      const rank = statistics(lotto, winningNumber);
      const rankKey = rank?.order;

      if (rankMap.has(rankKey)) {
        const currentStat = rankMap.get(rankKey);
        rankMap.set(rankKey, {
          ...currentStat,
          count: (currentStat.count || 0) + 1,
        });
      }
    });

    return statisticsMapper.toResponseDto(rankMap);
  }

  static #validate(lottos) {
    if (!lottos?.length) {
      throw new Error(statisticsUseCase.ERROR.ARRAY_EMPTY);
    }
  }
}
