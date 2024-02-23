import { GAME_MESSAGE, LOTTO_WINNING_RESULTS } from '../constant/gameMessage.js';
import handleIO from '../util/handleIO.js';

const OutputView = {
  printPurchaseResult(lottoList) {
    handleIO.print(`${lottoList.length}개를 구매했습니다.`);
    lottoList.forEach((lotto) => {
      handleIO.print(`[${lotto.join(', ')}]`);
    });
  },

  printWinningResults(winningResults) {
    handleIO.print(LOTTO_WINNING_RESULTS.LOTTO_WINNING_RESULT_TITLE);
    Object.entries(winningResults).forEach(([rank, winningCount]) => {
      handleIO.print(LOTTO_WINNING_RESULTS.WINNING_RESULT(rank, winningCount));
    });
  },

  printProfitRate(profitRate) {
    handleIO.print(`총 수익률은 ${profitRate}%입니다.`);
  },

  printExitMessage() {
    handleIO.print(GAME_MESSAGE.EXIT);
  },
};

export default OutputView;
