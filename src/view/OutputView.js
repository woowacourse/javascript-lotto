import { LOTTO_RANKING, PRINT_MESSAGE } from '../data/constants.js';
import Console from '../utils/Console.js';

const OutputView = {
  printErrorMessage(message) {
    Console.print(`[ERROR] ${message}`);
  },

  printPurchaseCount(count) {
    Console.print(PRINT_MESSAGE.PURCHASE_COUNT(count));
  },

  printLottoNumbers(lottoNumbers) {
    Console.print(`[${lottoNumbers.sort((a, b) => a - b).join(', ')}]`);
  },

  printWinningStatistics(winningResult) {
    Console.print('');
    Console.print(PRINT_MESSAGE.WINNING_STATISTICS);
    Console.print(PRINT_MESSAGE.LINE);
    Object.keys(winningResult).forEach((rank) => {
      Console.print(
        rank === LOTTO_RANKING.SECOND
          ? PRINT_MESSAGE.STATISTICS_RANKING_SECOND(winningResult[rank], rank)
          : PRINT_MESSAGE.STATISTICS_RANKING(winningResult[rank], rank)
      );
    });
  },

  printYieldRate(yieldRate) {
    Console.print(PRINT_MESSAGE.YIELD_RATE(yieldRate));
  },
};

export default OutputView;
