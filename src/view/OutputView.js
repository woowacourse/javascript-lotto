import { OUTPUT_MESSAGE } from "../constants/viewMessage.js";

const OutputView = {
  printLottoCount(lottoCount) {
    console.log(OUTPUT_MESSAGE.formatLottoCount(lottoCount));
  },

  printIssuedLottoArray(lottoArray) {
    console.log(OUTPUT_MESSAGE.formatLottoArrayToString(lottoArray));
  },

  printMatchedLottos(matchedLotto) {
    console.log(OUTPUT_MESSAGE.RESULT_TITLE);
    OUTPUT_MESSAGE.formatResults(matchedLotto).forEach((result) =>
      console.log(result)
    );
  },

  printProfits(profits) {
    console.log(OUTPUT_MESSAGE.formatProfits(profits));
  },

  printIssuedLottoArray(lottoArray) {
    console.log(OUTPUT_MESSAGE.formatLottoArrayToString(lottoArray));
  },

  printMatchedLottos(matchedLotto) {
    console.log(OUTPUT_MESSAGE.RESULT_TITLE);
    OUTPUT_MESSAGE.formatResults(matchedLotto).forEach((result) =>
      console.log(result)
    );
  },

  printProfits(profits) {
    console.log(OUTPUT_MESSAGE.formatProfits(profits));
  },
};

export default OutputView;
