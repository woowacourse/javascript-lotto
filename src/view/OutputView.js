import { OUTPUT_MESSAGE } from "../constants/viewMessage.js";

const OutputView = {
  printLottoCount(lottoCount) {
    console.log(OUTPUT_MESSAGE.formatLottoCount(lottoCount));
  },

  printIssuedLottoArray(lottoArray) {
    console.log(OUTPUT_MESSAGE.formatLottoArrayToString(lottoArray));
  },

  printMatchedLottos(matchedLotto) {
    console.log(OUTPUT_MESSAGE.statistics);
    console.log(OUTPUT_MESSAGE.symbolDash);
    OUTPUT_MESSAGE.formatResults(matchedLotto).forEach((result) => console.log(result));
  },

  printResultStatistics(profit) {
    console.log(OUTPUT_MESSAGE.formatProfit(profit));
  },
};

export default OutputView;
