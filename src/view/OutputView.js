import { ResultMessage } from '../constants/Constants.js';
import Console from '../utils/Console.js';

const OutputView = {
  printRanks(ranks) {
    [5, 4, 3, 2, 1].forEach((rank) => {
      const messageKey = `rank${rank}`;
      const message = ResultMessage[messageKey](ranks[rank]);
      console.log(message);
    });
  },

  printProfitRate(profitRate) {
    console.log(ResultMessage.profitRateResult(profitRate));
  },

  printResult(ranks, profitRate) {
    console.log('');
    console.log(ResultMessage.RESULT);
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
