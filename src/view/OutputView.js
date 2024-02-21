import { OUTPUT_MESSAGE } from "../constants/system.js";

const OutputView = {
  printError(error) {
    console.log(error);
  },

  printPurchaseMessage(purchaseAmount) {
    console.log(OUTPUT_MESSAGE.PURCHASE_NUMBER(purchaseAmount));
  },

  printLottos(lottoNumberArray) {
    lottoNumberArray.forEach((lottoNumber) => {
      console.log(lottoNumber.sort((a, b) => a - b));
    });
  },

  printResultHeader() {
    console.log(OUTPUT_MESSAGE.RESULT_HEADER);
  },

  printResult(rank) {
    this.printResultHeader();
    Object.keys(rank)
      .reverse()
      .forEach((key) => {
        console.log(OUTPUT_MESSAGE.RESULT(rank, key));
      });
  },

  printProfit(profit) {
    console.log(OUTPUT_MESSAGE.PROFIT(profit));
  },
};
export default OutputView;
