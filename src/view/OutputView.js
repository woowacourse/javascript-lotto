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

  printLottoResults(lottoRanking) {
    for (const score in lottoRanking) {
      Console.print(
        `${score} (${Core.moneyBoard[score]}원) - ${lottoRanking[score]}개`
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

  printResult(lottoAmount, lottoRanking) {
    this.printResultMessage();
    this.printLottoResults(lottoRanking);
    this.printTotalBenefit(lottoScore.getBenefitRate(lottoAmount));
  },
};

export default OutputView;
