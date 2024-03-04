import { RANK } from '../../constant/constants.js';
import { OUTPUT_MESSAGES } from '../../constant/messages.js';

const OutputView = {
  printBuyCount(count) {
    console.log(OUTPUT_MESSAGES.buyCount(count));
  },

  printLotto(lotto) {
    console.log(OUTPUT_MESSAGES.lotto(lotto));
  },

  printResult(results) {
    console.log(OUTPUT_MESSAGES.winningStatistics);
    console.log(OUTPUT_MESSAGES.separate);
    this.printMatchResult(results);
  },

  printMatchResult(result) {
    console.log(OUTPUT_MESSAGES[RANK.fifth](result[RANK.fifth]));
    console.log(OUTPUT_MESSAGES[RANK.fourth](result[RANK.fourth]));
    console.log(OUTPUT_MESSAGES[RANK.third](result[RANK.third]));
    console.log(OUTPUT_MESSAGES[RANK.second](result[RANK.second]));
    console.log(OUTPUT_MESSAGES[RANK.first](result[RANK.first]));
  },

  printProfit(profit) {
    console.log(OUTPUT_MESSAGES.profit(profit));
  },
};

export default OutputView;
