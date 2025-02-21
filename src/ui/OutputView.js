import OUTPUT_MESSAGE from "../constant/output.js";
import NEW_LINE from "../constant/newLine.js";
import { WINNING } from "../constant/lotto.js";

const OutputView = {
  printLotto(lotto) {
    console.log(`[${lotto.join(", ")}]`);
  },

  printWinningDetailTitle() {
    console.log(`${NEW_LINE}${OUTPUT_MESSAGE.WINNING_DETAILS_TITLE}`);
    console.log(OUTPUT_MESSAGE.HORIZONTAL_LINE);
  },

  printWinningDetail(winningCount) {
    const keys = Object.keys(winningCount).reverse();

    keys.forEach((key) => {
      console.log(
        `${WINNING[key].LABEL} (${WINNING[key].PRIZES.toLocaleString()}원) - ${
          winningCount[key]
        }개`
      );
    });
  },

  printYieldRate(yieldRate) {
    console.log(`총 수익률은 ${yieldRate}%입니다.${NEW_LINE}`);
  },

  printQuantity(quantity) {
    console.log(`${quantity}${OUTPUT_MESSAGE.QUANTITY}`);
  },
};

export default OutputView;
