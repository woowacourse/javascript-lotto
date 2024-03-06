import { OUTPUT_MESSAGE } from '../constants/view-messages.js';

const outputView = {
  printPurchaseMessage(purchaseAmount) {
    console.log(OUTPUT_MESSAGE.PURCHASE_NUMBER(purchaseAmount));
  },

  printLottoNumber(lottoNumbers) {
    console.log(lottoNumbers);
  },

  printResultHeader() {
    console.log(OUTPUT_MESSAGE.RESULT_HEADER);
  },

  printResult(totalResultWithoutNonePlace) {
    this.printResultHeader();
    Object.keys(totalResultWithoutNonePlace)
      .reverse()
      .forEach((rank) => {
        console.log(OUTPUT_MESSAGE.RESULT(totalResultWithoutNonePlace, rank));
      });
  },

  printProfit(profit) {
    console.log(OUTPUT_MESSAGE.PROFIT(profit));
  },
};
export default outputView;
