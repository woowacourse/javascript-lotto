import Lotto from "../../domain/Lotto.js";
import Rank from "../../domain/Rank.js";
import statisticsMapper from "./statisticsMapper.js";
import { statistics } from "./statisticsUtils.js";

export default class statisticsUseCase {
  static ERROR = {
    ARRAY_EMPTY: "로또를 구매하셔야 합니다",
  };

  static statisticsLottos(lottosNumbers, winningNumber) {
    this.#validate(lottosNumbers);

    const rankMap = Rank.getRankMap();
    const lottos = Lotto.fromList(lottosNumbers);

    lottos.forEach((lotto) => {
      const rank = statistics(lotto, winningNumber);
      const currentStat = rankMap.get(rank);
      rankMap.set(rank, { count: currentStat.count + 1 });
    });

    return statisticsMapper.toResponseDto(rankMap);
  }

  static #validate(lottosNumbers) {
    if (!lottosNumbers?.length) {
      throw new Error(statisticsUseCase.ERROR.ARRAY_EMPTY);
    }
  }
}
