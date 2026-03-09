import { getCompareResult } from "../service/getCompareResult.js";
import { OutputView } from "../view/output.js";

export function ResultController(myLotto, winningLotto) {
  const result = getCompareResult(myLotto.getRandomLotto(), winningLotto);
  const profit = myLotto.getProfit(result);
  OutputView.outputWinningStatics(result);
  OutputView.outputWinningProfit(profit);
}
