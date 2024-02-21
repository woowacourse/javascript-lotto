import { OUTPUT_MESSAGE } from "../constants/viewMessage.js";

const OutputView = {
  printLottoCount(lottoCount) {
    console.log(OUTPUT_MESSAGE.lottoCount(lottoCount));
  },
};

export default OutputView;
