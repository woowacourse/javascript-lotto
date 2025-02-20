import SYSTEM_MESSAGE from "../constants/systemMessage.js";
import { calculateProfitRate } from "../service/ProfitService.js";
import OutputView from "../view/OutputView.js";

export const ProfitController = (matchingCount, lottoCount) => {
  const profitRate = calculateProfitRate(matchingCount, lottoCount);

  OutputView.printMatchingCount(matchingCount);
  OutputView.print(SYSTEM_MESSAGE.PROFIT(profitRate));
};
