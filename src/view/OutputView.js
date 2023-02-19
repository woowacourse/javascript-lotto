import Console from "../util/Console";
import View from "../constants/View.js";
import LOTTO_BOARD from "../constants/LottoBoard.js";

const OutputView = {
  printLottoAmount(lottoAmount) {
    Console.print(`${lottoAmount}${View.PRINT_LOTTO_AMOUNT}`);
  },

  printLottos(lottos) {
    lottos.forEach((lotto) => {
      lotto.sortLottoNumbers();
      Console.print(lotto.lottoNumbers);
    });
  },

  printResultMessage() {
    Console.print(View.PRINT_RESULT_TITLE);
    Console.print(View.DEVISION_BAR.repeat(20));
  },

  printLottoResults(lottoRanking) {
    for (const score in lottoRanking) {
      Console.print(
        `${score} (${LOTTO_BOARD.moneyBoard[score]}원) - ${lottoRanking[score]}개`
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

  printResult(lottoAmount, lottoScore) {
    this.printResultMessage();
    this.printLottoResults(lottoScore.lottoRanking);
    this.printTotalBenefit(lottoScore.getLottoBenefitRate(lottoAmount));
  },
};

export default OutputView;
