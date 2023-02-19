import Console from "../util/Console";
import View from "../constants/View.js";
import Core from "../constants/Core.js";

const OutputView = {
  printLottoAmount(lottoAmount) {
    Console.print(`${lottoAmount}${View.PRINT_LOTTO_AMOUNT}`);
  },

  printLottos(lottos) {
    lottos.forEach((lotto) => {
      lotto.sortLottoNumbers();
      Console.print(lotto.getLottoNumbers());
    });
  },

  printResultMessage() {
    Console.print(View.PRINT_RESULT_TITLE);
    Console.print(View.DEVISION_BAR.repeat(20));
  },

  printLottoResults(lottoScore) {
    for (const score in lottoScore.lottoRanking) {
      Console.print(
        `${score} (${Core.moneyBoard[score]}원) - ${
          lottoScore.lottoRanking[score]
        }개`
      );
    }
  },

  printTotalBenefit(lottos) {
    Console.print(
      `${View.PRINT_BENEFIT_RATE_START} ${lottos}${View.PRINT_BENEFIT_RATE_END}`
    );
  },

  printBuyLottos(lottos) {
    this.printLottoAmount(lottos.length);
    this.printLottos(lottos);
  },

  printResult(lottos, lottoScore) {
    this.printResultMessage();
    this.printLottoResults(lottoScore);
    this.printTotalBenefit(
      lottoScore.getBenefitRate(lottos.getLottos().length)
    );
  }
};

export default OutputView;
