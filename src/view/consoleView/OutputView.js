import { MESSAGE, MESSAGE_METHOD } from '../../utils/constants.js';
import readLine from '../../utils/readLine.js';

const OutputView = {
  printPurchasedLottoCount(count) {
    console.log(MESSAGE_METHOD.PURCHASED_LOTTO_COUNT(count));
  },

  printPurChasedLottoList(lottos) {
    lottos.forEach((lotto) => {
      console.log(MESSAGE_METHOD.PURCHASED_LOTTO(lotto));
    });
  },

  printWinningRankResult(rankResult) {
    console.log(MESSAGE_METHOD.WINNING_RANK_RESULT(rankResult));
  },

  printProfitRate(rate) {
    const parsedRate = Number(rate.toFixed(1)).toLocaleString();
    console.log(MESSAGE_METHOD.PROFIT_RATE(parsedRate));
  },

  printErrorMessage(error) {
    console.error(error.message);
  },

  closeConsole() {
    readLine.close();
  },
};

export default OutputView;
