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
    console.log("\n당첨 통계\n-------------------");
    console.log(`3개 일치 (5,000원) - ${rankResult[5]}개`);
    console.log(`4개 일치 (50,000원)) - ${rankResult[4]}개`);
    console.log(`5개 일치 (1,500,000원) - ${rankResult[3]}개`);
    console.log(`5개 일치, 보너스 볼 일치 (30,000,000원) - ${rankResult[2]}개`);
    console.log(`6개 일치 (2,000,000,000원) - ${rankResult[1]}개`);
  },

  printRevenue(revenue) {
    console.log(`총 수익률은 ${revenue}%입니다.`);
  },

  printErrorMessage(errorMessage) {
    console.log(errorMessage);
  },
};

module.exports = OutputView;
