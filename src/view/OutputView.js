import SYSTEM_MESSAGE from "../constants/systemMessage.js";

const OutputView = {
  print(message) {
    console.log(message);
  },
  printError(error) {
    console.error(error.message);
  },
  printLottoArray(lottoArray) {
    lottoArray.forEach((lotto) => OutputView.print(lotto.numbers));
  },
  printMatchingCount(matchingCount) {
    OutputView.print(SYSTEM_MESSAGE.WINNING_STATISTICS(matchingCount));
  },
};
export default OutputView;
