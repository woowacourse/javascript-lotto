import { WINNING } from "../constant/lotto.js";
import OUTPUT_MESSAGE from "../constant/output.js";

const OutputView = {
  printLotto(lotto) {
    console.log(`[${lotto.join(', ')}]`);
  },

  printWinningDetailTitle() {
    console.log(OUTPUT_MESSAGE.WINNING_DETAILS_TITLE);
  },

  printWinningDetail(winningCount) {
    const keys = Object.keys(winningCount).reverse();
    
    keys.forEach((key) => {
        console.log(`${WINNING[key].LABEL} (${WINNING[key].PRIZES.toLocaleString()}원) - ${winningCount[key]}개\n`);
    })
  }
}

export default OutputView;