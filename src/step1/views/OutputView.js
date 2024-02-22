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
    const ranks = Object.keys(winningResult);
    ranks.forEach((rank) => {
      const { reward, rule, matchedCount } = winningResult[rank];
      if (rank === "second") {
        this.printMessage(
          `${rule}개 일치, 보너스 볼 일치 (${reward.toLocaleString()}원) - ${matchedCount}개`
        );
        return;
      }
      this.printMessage(
        `${rule}개 일치 (${reward.toLocaleString()}원) - ${matchedCount}개`
      );
    });
  },
};

export default OutputView;
