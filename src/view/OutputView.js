import Console from "../utils/Console.js";
const OutputView = {
  purchaseCount(count) {
    Console.print(`${count}개를 구매했습니다.`);
  },
  lottoPack(lottoPack) {
    lottoPack.lottos.forEach((lotto) => {
      Console.print(`[${lotto.lottoNumbers.join(", ")}]`);
    });
  },

  winningStatistics(winningResult) {
    Console.print(`당첨 통계`);
    Console.print(`--------------------`);
    Console.print(`3개 일치 (5,000원) - ${winningResult[3]}개`);
    Console.print(`4개 일치 (50,000원) - ${winningResult[4]}개`);
    Console.print(`5개 일치 (1,500,000원) - ${winningResult[5]}개`);
    Console.print(`5개 일치, 보너스 볼 일치 (30,000,000원) - ${winningResult["5+1"]}개`);
    Console.print(`6개 일치 (2,000,000,000원) - ${winningResult[6]}개`);
  },

  profitRate(profitRate) {
    Console.print(`총 수익률은 ${profitRate}%입니다.`);
  },
};
export default OutputView;
