import { getCompareResult } from "../service/getCompareResult.js";
import { getProfit } from "../service/getProfit.js";
import { OutputView } from "../view/output.js";

export function ResultController(myLotto, winningLotto) {
  const result = getCompareResult(myLotto.getRandomLotto(), winningLotto);
  const profit = getProfit(myLotto.getMoney(), result);
  OutputView.outputWinningStatics(result);
  OutputView.outputWinningProfit(profit);
}
