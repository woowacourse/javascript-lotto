import SYSTEM_MESSAGE from "../../common/lottoConstants/systemMessage.js";
import { calculateProfitRate } from "../../common/service/ProfitService.js";
import OutputView from "../view/outputView.js";

export const ProfitController = (matchingCount, lottoCount) => {
  const profitRate = calculateProfitRate(matchingCount, lottoCount);

  OutputView.printMatchingCount(matchingCount);
  OutputView.print(SYSTEM_MESSAGE.PROFIT(profitRate));
};
