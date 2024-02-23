import { PRIZE } from "../constants/viewMessage.js";
import { VIEW_MESSAGE } from "../constants/viewMessage.js";
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
    OUTPUT_MESSAGE.formatResults(matchedLotto).forEach((result) => console.log(result));
  },

  printProfits(profits) {
    console.log(OUTPUT_MESSAGE.formatProfits(profits));
  },

  printIssuedLottoArray(lottoArray) {
    console.log(OUTPUT_MESSAGE.lottoArrayToString(lottoArray));
  },

  printMatchedLottos(matchedLotto) {
    console.log(VIEW_MESSAGE.statistics);
    console.log(VIEW_MESSAGE.symbolDash);

    Object.keys(matchedLotto)
      .sort((a, b) => b - a)
      .forEach((key) => {
        console.log(`${PRIZE[key]} - ${matchedLotto[key]}개`);
      });
  },

  printResultStatistics(profits) {
    console.log(`총 수익률은 ${profits}%입니다.\n`);
  },
};

export default OutputView;
