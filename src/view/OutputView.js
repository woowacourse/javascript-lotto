const Console = require("../utils/Console");

const OutputView = {
  printError(error) {
    Console.print(error);
  },

  printLotteries(lotteries) {
    Console.print(`${lotteries.length}매를 구매했습니다.`);
    lotteries.forEach((lotto) => Console.print(lotto));
  },
};

module.exports = OutputView;
