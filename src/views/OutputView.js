import Console from '../utils/Console.js';
import LOTTO_STATISTICS from '../constants/lotto-statistics.js';
import { OUTPUT_MESSAGES } from '../constants/messages.js';
import { createWinningResult } from '../utils/createWinningResult.js';

const OutputView = {
  printTicketCount(count) {
    Console.print(OUTPUT_MESSAGES.ticketCount(count));
  },

  printGeneratedLottos(lottos) {
    lottos.forEach((lotto) => {
      Console.print(lotto);
    });
  },

  printWinningStatistics(statistics) {
    Console.print(OUTPUT_MESSAGES.winningStatistics);
    Console.print(OUTPUT_MESSAGES.winningStatisticsOperation);
    this.printStatistics(statistics);
  },

  printStatistics(statistics) {
    const keys = Object.keys(LOTTO_STATISTICS);

    keys.forEach((key) => {
      const message = createWinningResult(key, statistics[key]);
      Console.print(message);
    });
  },

  printTotalProfit(profit) {
    Console.print(OUTPUT_MESSAGES.totalProfit(profit));
  },

  printNewLine() {
    Console.print('');
  },
};

export default OutputView;
