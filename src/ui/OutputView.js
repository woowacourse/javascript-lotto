import OUTPUT_MESSAGE from "../constant/output.js";
import STRING from "../constant/string.js";
import { WINNING } from "../constant/lotto.js";

const OutputView = {
  printLotto(lotto) {
    console.log(`[${lotto.join(STRING.PRINT_LOTTO_SPLITTER)}]`);
  },

  printWinningDetailTitle() {
    console.log(OUTPUT_MESSAGE.WINNING_DETAILS_TITLE);
  },

  printWinningDetail(winningCount, rankKeys) {
    rankKeys.forEach((key) => {
      console.log(
        `${WINNING[key].LABEL} (${WINNING[key].PRIZES.toLocaleString()}원) - ${winningCount[key]}개`,
      );
    });
  },

  printYieldRate(yieldRate) {
    console.log(`총 수익률은 ${yieldRate}%입니다.\n`);
  },

  printQuantity(quantity) {
    console.log(`${quantity}${OUTPUT_MESSAGE.QUANTITY}`);
  },
};

export default OutputView;
