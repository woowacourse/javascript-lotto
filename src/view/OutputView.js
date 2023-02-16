const Console = require("../utils/Console");
const { AMOUNT_OF_PURCHASE, MESSAGE } = require("../constants");

const OutputView = {
  printError(error) {
    Console.print(error.message);
  },

  printLotteries(lotteries) {
    Console.print(AMOUNT_OF_PURCHASE(lotteries.length));
    lotteries.forEach((lotto) => Console.print(`[${lotto}]`));
  },

  printResult(lottoResult) {
    Console.print(
      `\n당첨 통계\n--------------------\n3개 일치 (5,000원) - ${lottoResult[0]}개\n4개 일치 (50,000원) - ${lottoResult[1]}개\n5개 일치 (1,500,000원) - ${lottoResult[2]}개\n5개 일치, 보너스 볼 일치 (30,000,000원) - ${lottoResult[3]}개\n6개 일치 (2,000,000,000원) - ${lottoResult[4]}개\n총 수익률은 ${lottoResult[5]}%입니다.`
    );
  },

  printRestart() {
    Console.print(MESSAGE.RESTART);
  },

  printQuit() {
    Console.print(MESSAGE.QUIT);
    Console.close();
  },
};

module.exports = OutputView;
