import { WINNING } from "../constant/lotto.js";

const OutputView = {
  printLotto(lotto) {
    console.log(`[${lotto.join(', ')}]`);
  },

  printWinningDetail(winningCount) {
    const keys = Object.keys(winningCount).reverse();
    
    keys.forEach((key) => {
        console.log(`${WINNING[key].LABEL} (${WINNING[key].PRIZES.toLocaleString()}원) - ${winningCount[key]}개\n`);
    })
  }
}

export default OutputView;