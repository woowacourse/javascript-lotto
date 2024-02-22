import { GAME_MESSAGE, LOTTO_WINNING_RESULTS } from '../constant/gameMessage.js';
import handleIO from '../util/handleIO.js';

const OutputView = {
  printPurchaseResult(lottoList) {
    handleIO.print(GAME_MESSAGE.PURCHASE_RESULT_TEXT(lottoList.length));
    lottoList.forEach((lotto) => {
      handleIO.print(GAME_MESSAGE.LOTTO_ITEM(lotto));
    });
  },

  printWinningResults(winningResults) {
    handleIO.print(GAME_MESSAGE.LOTTO_WINNING_RESULT_TITLE);
    Object.entries(winningResults).forEach(([rank, winningCount]) => {
      handleIO.print(LOTTO_WINNING_RESULTS.WINNING_RESULT(rank, winningCount));
    });
  },

  printProfitRate(profitRate) {
    handleIO.print(GAME_MESSAGE.LOTTO_PROFIT_RATE(profitRate));
  },

  printExitMessage() {
    handleIO.print(GAME_MESSAGE.EXIT);
  },
};

export default OutputView;
