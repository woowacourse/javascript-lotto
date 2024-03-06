import Console from '../utils/Console';
import LOTTO_STATISTICS from '../constants/lotto-statistics';
import { OUTPUT_MESSAGES } from '../constants/messages';

const outputView = {
  printLottoPayment(count) {
    Console.print(OUTPUT_MESSAGES.lottoPayment(count));
  },

  printGeneratedLottos(lottos) {
    lottos.forEach((lotto) => {
      Console.print(lotto);
    });
  },

  printWinningStatistics(statics) {
    Console.print(OUTPUT_MESSAGES.winningStatistics);
    Console.print(OUTPUT_MESSAGES.winningStatisticsOperation);
    this.printStatistics(statics);
  },

  printStatistics(count) {
    const keys = Object.keys(LOTTO_STATISTICS);

    keys.forEach((key) => {
      Console.print(this.resultOutputFormat(key, count));
    });
  },

  resultOutputFormat(key, count) {
    const totalResult = `${LOTTO_STATISTICS[key].number}개 일치`;
    const bonusResult = key === 'fiveBonus' ? ', 보너스 볼 일치' : '';

    const moneyEarned = `${LOTTO_STATISTICS[key].price.toLocaleString()}원`;
    const countMatched = `${count[key]}개`;

    return `${totalResult}${bonusResult} (${moneyEarned}) - ${countMatched}`;
  },

  printTotalProfit(profit) {
    Console.print(OUTPUT_MESSAGES.totalProfit(profit));
  },

  printNewLine() {
    Console.print('');
  },
};

export default outputView;
