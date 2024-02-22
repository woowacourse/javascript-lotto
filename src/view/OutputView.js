import { SYMBOL } from "../constants/condition";
import LOTTO_SYSTEM from "../constants/lottoSystem";
import { OUTPUT_MESSAGE } from "../constants/message";

const OutputView = {
  printLottos(lottos) {
    this.print(lottos.length + OUTPUT_MESSAGE.purchaseCount);

    lottos.forEach((lotto) => {
      this.print(lotto.numbers.sort((a, b) => a - b));
    });
    this.print(SYMBOL.space);
  },

  printRankings(rankings) {
    this.print(OUTPUT_MESSAGE.winningStatistics);

    const totalRanking = this.calculateTotalRanking(rankings);

    for (let i = totalRanking.length - 1; i > 0; i--) {
      this.print(this.formatStatisticsResult(i, totalRanking[i]));
    }
  },

  printTotalProfitRate(totalProfitRate) {
    this.print(OUTPUT_MESSAGE.totalProfitRate(totalProfitRate));
  },

  calculateTotalRanking(rankings) {
    const initialRanking = [0, 0, 0, 0, 0, 0];

    return rankings.reduce((acc, rank) => {
      acc[rank] += 1;

      return acc;
    }, initialRanking);
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
