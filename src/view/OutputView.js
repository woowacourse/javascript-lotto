import { SYMBOL } from "../constants/condition";
import LOTTO_SYSTEM from "../constants/lottoSystem";
import { OUTPUT_MESSAGE } from "../constants/message";

const OutputView = {
  printLottos(lottos) {
    this.print(lottos.length + OUTPUT_MESSAGE.purchaseCount);

    lottos.forEach((lotto) => {
      this.print(lotto.numbers);
    });
    this.print(SYMBOL.space);
  },

  printRankings(totalRanking) {
    this.print(OUTPUT_MESSAGE.winningStatistics);

    for (let i = totalRanking.length - 1; i > 0; i--) {
      this.print(this.formatStatisticsResult(i, totalRanking[i]));
    }
  },

  printTotalProfitRate(totalProfitRate) {
    this.print(OUTPUT_MESSAGE.totalProfitRate(totalProfitRate));
  },

  formatStatisticsResult(ranking, count) {
    const secondPlace = 2;

    if (ranking === secondPlace)
      return OUTPUT_MESSAGE.winningStatisticsBonusResult(
        LOTTO_SYSTEM.correctCount[ranking],
        LOTTO_SYSTEM.lottoPrize[ranking],
        count,
      );

    return OUTPUT_MESSAGE.winningStatisticsResult(
      LOTTO_SYSTEM.correctCount[ranking],
      LOTTO_SYSTEM.lottoPrize[ranking],
      count,
    );
  },

  print(message) {
    console.log(message);
  },
};

export default OutputView;
