import SYSTEM_MESSAGE from "../constants/systemMessage.js";

const OutputView = {
  print(message) {
    console.log(message);
  },
  printError(error) {
    console.error(error.message);
  },
  printLottoArray(lottoArray) {
    lottoArray.forEach((lotto) => OutputView.print(lotto.toString()));
  },
  printMatchingResult(matchingResult) {
    OutputView.print(SYSTEM_MESSAGE.WINNING_STATISTICS(matchingResult));
  },
};
export default OutputView;
