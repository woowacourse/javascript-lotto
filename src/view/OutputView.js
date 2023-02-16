import Console from "../util/Console";

const moneyBoard = {
    "3개 일치": '5,000',
    "4개 일치": '50,000',
    "5개 일치": '1,500,000',
    "5개 일치, 보너스 볼 일치": '30,000,000',
    "6개 일치": '2,000,000,000',
}

const OutputView = {
  printLottoAmount(lottoAmount) {
    Console.print(`${lottoAmount}개를 구매했습니다.`);
  },

  printLottos(lottos) {
    lottos.forEach((lotto) => {
      lotto.sortLottoNumbers();
      Console.print(lotto.getLottoNumbers());
    });
  },

  printResultMessage() {
      Console.print("당첨통계");
      Console.print("-".repeat(20))
    },
  
    printLottoResults(lottos) {
      for (const score in lottos.getLottoRanking()) {
            Console.print(`${score} (${moneyBoard[score]}원) - ${lottos.getLottoRanking()[score]}개`)
        }
    },

    printTotalBenefit(lottos) {
        // Console.print(`총 수익률은 ${lottos.getBenefitRate(lottos.getLottos().length * 1000)}% 입니다.`)
        Console.print(`총 수익률은 ${lottos}% 입니다.`)
      
    }
};

export default OutputView;
