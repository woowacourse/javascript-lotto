import { PRIZE } from "../constants/constant.js";
import { webOutputPrinter } from "./webOutputPrinter.js";

export const OutputView = {
  isWeb: false,

  setIsWeb(boolean) {
    this.isWeb = boolean;
  },

  outputLottoNumber(randomLottos) {
    if (this.isWeb) webOutputPrinter.printMyLottoLists(randomLottos);
  
    console.log(randomLottos.length, "개를 구매했습니다.");
    for (let i = 0; i < randomLottos.length; i++) {
      console.log(randomLottos[i].getNumber());
    }
  },

  outputWinningStatics(result) {
    if (this.isWeb) webOutputPrinter.printLottoResult(result);
    const output = [
      "\n당첨 통계",
      "---------------",
      `3개 일치 (${PRIZE.FIFTH.toLocaleString()}원) - ${result.FIFTH}개`,
      `4개 일치 (${PRIZE.FOURTH.toLocaleString()}원) - ${result.FOURTH}개`,
      `5개 일치 (${PRIZE.THIRD.toLocaleString()}원) - ${result.THIRD}개`,
      `5개 일치, 보너스 볼 일치 (${PRIZE.SECOND.toLocaleString()}원) - ${result.SECOND}개`,
      `6개 일치 (${PRIZE.FIRST.toLocaleString()}원) - ${result.FIRST}개`,
    ].join("\n");
    console.log(output);
  },

  outputWinningProfit(profit) {
    if (this.isWeb) webOutputPrinter.printProfit(profit);
    console.log(`총 수익률은 ${profit.toFixed(1)}%입니다.`);
  },

  outputError(message) {
    if (this.isWeb) alert(message);
    console.log(message);
  },
};
