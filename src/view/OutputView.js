import Console from "../util/Console";
import View from "../constants/View.js"

const moneyBoard = {
    "3개 일치": '5,000',
    "4개 일치": '50,000',
    "5개 일치": '1,500,000',
    "5개 일치, 보너스 볼 일치": '30,000,000',
    "6개 일치": '2,000,000,000',
}

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
      Console.print(View.DEVISION_BAR.repeat(20))
    },
  
    printLottoResults(lottos) {
      for (const score in lottos.getLottoRanking()) {
            Console.print(`${score} (${moneyBoard[score]}원) - ${lottos.getLottoRanking()[score]}개`)
        }
    },

    printTotalBenefit(lottos) {
        Console.print(`${View.PRINT_BENEFIT_RATE_START} ${lottos}${View.PRINT_BENEFIT_RATE_END}`)
      
    }
};

export default OutputView;
