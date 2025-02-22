import Console from "../utils/Console.js";
import OUTPUT_MESSAGE from "../constants/OUTPUT_MESSAGE.js";
import { MATCH_COUNT } from "../constants/constant.js";

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
    Console.print(`${MATCH_COUNT.THREE} - ${winningResult[MATCH_COUNT.THREE]}개`);
    Console.print(`${MATCH_COUNT.FOUR} - ${winningResult[MATCH_COUNT.FOUR]}개`);
    Console.print(`${MATCH_COUNT.FIVE} - ${winningResult[MATCH_COUNT.FIVE]}개`);
    Console.print(`${MATCH_COUNT.FIVE_BONUS} - ${winningResult[MATCH_COUNT.FIVE_BONUS]}개`);
    Console.print(`${MATCH_COUNT.SIX} - ${winningResult[MATCH_COUNT.SIX]}개`);
  },

  profitRate(profitRate) {
    Console.print(OUTPUT_MESSAGE.PROFIT_RATE(profitRate));
    Console.println();
  },
};
export default OutputView;
