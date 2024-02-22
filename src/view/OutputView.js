import GAME_MESSAGE from '../constant/gameMessage.js';
import handleIO from '../util/handleIO.js';

const OutputView = {
  printPurchaseResult(purchaseAmount) {
    handleIO.print(GAME_MESSAGE.PURCHASE_RESULT_TEXT(purchaseAmount));
  },

  printLottoItems(lottos) {
    lottos.forEach((lotto) => {
      handleIO.print(GAME_MESSAGE.LOTTO_ITEM(lotto));
    });
  },

  printWinningResultTitle() {
    handleIO.print(GAME_MESSAGE.LOTTO_WINNING_RESULT_TITLE);
  },

  printWinningResults(match, reward, count) {
    handleIO.print(GAME_MESSAGE.LOTTO_WINNING_RESULTS(match, reward, count));
  },

  printProfitRate(profitRate) {
    handleIO.print(GAME_MESSAGE.LOTTO_PROFIT_RATE(profitRate));
  },
};

export default OutputView;
