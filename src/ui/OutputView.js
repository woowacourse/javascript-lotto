import OUTPUT_MESSAGE from "../constant/output.js";
import { WINNING } from "../constant/lotto.js";

const OutputView = {
  printLotto(lotto) {
    console.log(`[${lotto.join(", ")}]`);
  },

  printWinningDetailTitle() {
    console.log(OUTPUT_MESSAGE.WINNING_DETAILS_TITLE);
  },

  printWinningDetail(winningCount) {
    const keys = Object.keys(winningCount).reverse();

    keys.forEach((key) => {
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
