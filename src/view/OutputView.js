import { ConsoleMessage } from '../constants/Constants.js';
import Console from '../utils/Console.js';

const OutputView = {
  printRanks(ranks) {
    const RANK_MESSAGES = ConsoleMessage.rankResult(ranks);
    RANK_MESSAGES.forEach((message) => console.log(message));
  },

  printProfitRate(profitRate) {
    console.log(ConsoleMessage.profitRateResult(profitRate));
  },

  printResult(ranks, profitRate) {
    console.log('');
    console.log(ConsoleMessage.RESULT);
    OutputView.printRanks(ranks);
    OutputView.printProfitRate(profitRate);
    console.log('');
  },

  print(message) {
    console.log(message);
  },

  close() {
    Console.close();
  },
};

export default OutputView;
