import Console from "../utils/Console.js";
import OUTPUT_MESSAGE from "../constants/OUTPUT_MESSAGE.js";
const OutputView = {
  purchaseCount(count) {
    Console.print(OUTPUT_MESSAGE.PURCHASE_COUNT(count));
  },
  lottoPack(lottos) {
    lottos.forEach((lotto) => {
      Console.print(OUTPUT_MESSAGE.LOTTO_NUMBERS(lotto.lottoNumbers));
    });
    Console.println();
  },

  winningStatistics(winningResult) {
    Console.println();
    Console.print(`당첨 통계`);
    Console.print(`--------------------`);
    Console.print(`3개 일치 (5,000원) - ${winningResult[3]}개`);
    Console.print(`4개 일치 (50,000원) - ${winningResult[4]}개`);
    Console.print(`5개 일치 (1,500,000원) - ${winningResult[5]}개`);
    Console.print(`5개 일치, 보너스 볼 일치 (30,000,000원) - ${winningResult["5+1"]}개`);
    Console.print(`6개 일치 (2,000,000,000원) - ${winningResult[6]}개`);
  },

  profitRate(profitRate) {
    Console.print(OUTPUT_MESSAGE.PROFIT_RATE(profitRate));
    Console.println();
  },
};
export default OutputView;
