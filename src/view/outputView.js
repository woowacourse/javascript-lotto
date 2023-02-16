const { MESSAGES } = require("../constant/Constant");

const OutputView = {
  printLottoCount(lottoCount) {
    console.log(lottoCount + MESSAGES.printLottoCountText);
  },

  printPurchaseLottos(lottos) {
    const result = lottos
      .map((lotto) => `[${lotto.numbers.join(", ")}]\n`)
      .join("");

    console.log(result);
  },

  printRankResult(rankResult) {
    console.log(MESSAGES.printRankResultText);
    console.log(MESSAGES.printFifthText + rankResult[5] + MESSAGES.piecesText);
    console.log(MESSAGES.printFourthText + rankResult[4] + MESSAGES.piecesText);
    console.log(MESSAGES.printThridText + rankResult[3] + MESSAGES.piecesText);
    console.log(MESSAGES.printSecondText + rankResult[2] + MESSAGES.piecesText);
    console.log(MESSAGES.printFirstText + rankResult[1] + MESSAGES.piecesText);
  },

  printRevenue(revenue) {
    console.log(MESSAGES.printRevenueText + revenue + MESSAGES.printFinalText);
  },

  printErrorMessage(errorMessage) {
    console.log(errorMessage);
  },
};

module.exports = OutputView;
