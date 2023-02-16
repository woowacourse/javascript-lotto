import { MESSAGE } from '../utils/constants.js';
import readLine from '../utils/readLine.js';

const OutputView = {
  printPurchasedLottoCount(count) {
    console.log(MESSAGE.PURCHASED_LOTTO_COUNT(count));
  },

  printPurChasedLottoList(lottos) {
    lottos.forEach((lotto) => {
      console.log(MESSAGE.PURCHASED_LOTTO(lotto));
    });
  },

  printWinningRankResult(rankResult) {
    console.log(MESSAGE.WINNING_RANK_RESULT(rankResult));
  },

  printProfitRate(rate) {
    const parsedRate = Number(rate.toFixed(1)).toLocaleString();
    console.log(MESSAGE.PROFIT_RATE(parsedRate));
  },

  printErrorMessage(error) {
    console.error(error.message);
  },

  closeConsole() {
    readLine.close();
  },
};

export default OutputView;
