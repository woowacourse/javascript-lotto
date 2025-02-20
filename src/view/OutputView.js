import { OUTPUT_MESSAGE } from '../constants/message.js';

const OutputView = {
  printLottoQuantity(quantity) {
    console.log(OUTPUT_MESSAGE.LOTTO_QUANTITY(quantity));
  },
  printSingleLotto(lotto) {
    console.log(OUTPUT_MESSAGE.SINGLE_LOTTO(lotto));
  },
  printRankResult(key, value) {
    console.log(OUTPUT_MESSAGE.RANK_RESULT(key, value));
  },
  printRankResultHeadLine() {
    console.log(OUTPUT_MESSAGE.RANK_RESULT_HEADLINE);
  },
  printRevenueRate(revenueRate) {
    console.log(OUTPUT_MESSAGE.REVENUE_RATE(revenueRate));
  },
};

export default OutputView;
