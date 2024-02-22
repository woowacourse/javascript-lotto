import { OUTPUT_MESSAGES } from '../constant/index.js';

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

  printMatchResult({ three, four, five, five_bonus, six }) {
    console.log(OUTPUT_MESSAGES.three(three));
    console.log(OUTPUT_MESSAGES.four(four));
    console.log(OUTPUT_MESSAGES.five(five));
    console.log(OUTPUT_MESSAGES.five_bonus(five_bonus));
    console.log(OUTPUT_MESSAGES.six(six));
  },

  printProfit(profit) {
    console.log(OUTPUT_MESSAGES.profit(profit));
  },
};

export default OutputView;
