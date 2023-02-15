const Console = require("../utils/Console");
const { AMOUNT_OF_PURCHASE } = require("../constants");

const OutputView = {
  printError(error) {
    Console.print(error.message);
  },

  printLotteries(lotteries) {
    Console.print(AMOUNT_OF_PURCHASE(lotteries.length));
    lotteries.forEach((lotto) => Console.print(`[${lotto}]`));
  },
};

module.exports = OutputView;
