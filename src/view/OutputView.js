import { NO_MATCH_PLACE } from "../constants/prize-constants.js";
import { OUTPUT_MESSAGE } from "../constants/view-messages.js";

const OutputView = {
  printPurchaseMessage(purchaseAmount) {
    console.log(OUTPUT_MESSAGE.PURCHASE_NUMBER(purchaseAmount));
  },

  printLottoNumber(lottoNumbers) {
    console.log(lottoNumbers.sort((a, b) => b - a));
  },

  printResultHeader() {
    console.log(OUTPUT_MESSAGE.RESULT_HEADER);
  },

  printResult(totalResult) {
    this.printResultHeader();
    Object.keys(totalResult)
      .reverse()
      .forEach((rank) => {
        rank !== NO_MATCH_PLACE &&
          console.log(OUTPUT_MESSAGE.RESULT(totalResult, rank));
      });
  },

  printProfit(profit) {
    console.log(OUTPUT_MESSAGE.PROFIT(profit));
  },
};
export default OutputView;
