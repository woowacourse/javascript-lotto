import Console from "../utils/Console";

const OutputView = {
  printMessage(message) {
    Console.print(message);
  },

  printLottoCount(lottoCount) {
    this.printMessage(`${lottoCount}개를 구매했습니다.`);
  },

  printReturnRate(returnRate) {
    this.printMessage(`총 수익률은 ${returnRate}%입니다.`);
  },

  printTotalLottos(lottos, lottosCount) {
    this.printLottoCount(lottosCount);

    lottos.forEach((lotto) => {
      const sortedLottoNumers = lotto.sort((a, b) => a - b);
      Console.print(sortedLottoNumers);
    });
  },

  printWinningResult(winningResult) {
    this.printMessage("당첨 통계");
    this.printMessage("--------------------");
    this.printMessage(`
    3개 일치 (5,000원) - ${winningResult.fifth}개\n
    4개 일치 (50,000원) - ${winningResult.fourth}개\n
    5개 일치 (1,500,000원) - ${winningResult.third}개\n
    5개 일치, 보너스 볼 일치 (30,000,000원) - ${winningResult.second}개\n
    6개 일치 (2,000,000,000원) - ${winningResult.first}개`);
  },
};

export default OutputView;
