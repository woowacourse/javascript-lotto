const { MESSAGES } = require("../constant/Constant");

const OutputView = {
  printLottoCount(lottoCount) {
    console.log(lottoCount + MESSAGES.printLottoCount);
  },

  printPurchaseLottos(lottos) {
    const result = lottos
      .map((lotto) => `[${lotto.numbers.join(", ")}]\n`)
      .join("");

    console.log(result);
  },

  printRankResult(rankResult) {
    console.log("\n" + MESSAGES.printRankResult + "\n" + MESSAGES.printHyphen);
    console.log(MESSAGES.printFifth + rankResult[5] + MESSAGES.pieces);
    console.log(MESSAGES.printFourth + rankResult[4] + MESSAGES.pieces);
    console.log(MESSAGES.printThrid + rankResult[3] + MESSAGES.pieces);
    console.log(MESSAGES.printSecond + rankResult[2] + MESSAGES.pieces);
    console.log(MESSAGES.printFirst + rankResult[1] + MESSAGES.pieces);
  },

  printRevenue(revenue) {
    console.log(MESSAGES.printRevenue + revenue + MESSAGES.printFinal);
  },

  printErrorMessage(errorMessage) {
    console.log(errorMessage + "\n");
  },
};

module.exports = OutputView;
