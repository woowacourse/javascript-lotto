import { OUTPUT_MESSAGES, CREATE_OUTPUT_MESSAGES } from '../constant/index.js';

const OutputView = {
  printBuyCount(count) {
    console.log(CREATE_OUTPUT_MESSAGES.buyCount(count));
  },

  printLotto(lotto) {
    console.log(CREATE_OUTPUT_MESSAGES.lotto(lotto));
  },

  printResult(results) {
    console.log(OUTPUT_MESSAGES.winning_statistics);
    console.log(OUTPUT_MESSAGES.separate);
    this.printMatchResult(results);
  },

  printMatchResult({ three, four, five, five_bonus, six }) {
    console.log(CREATE_OUTPUT_MESSAGES.three(three));
    console.log(CREATE_OUTPUT_MESSAGES.four(four));
    console.log(CREATE_OUTPUT_MESSAGES.five(five));
    console.log(CREATE_OUTPUT_MESSAGES.five_bonus(five_bonus));
    console.log(CREATE_OUTPUT_MESSAGES.six(six));
  },

  printProfit(profit) {
    console.log(CREATE_OUTPUT_MESSAGES.profit(profit));
  },
};

export default OutputView;
