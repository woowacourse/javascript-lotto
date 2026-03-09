import { getCompareResult } from "../service/getCompareResult.js";
import { OutputView } from "../view/output.js";

export function ResultController(myLotto, winningLotto) {
  const rankResult = getCompareResult(myLotto.getRandomLotto(), winningLotto);
  const profit = myLotto.getProfit(rankResult);
  OutputView.outputWinningStatics(rankResult);
  OutputView.outputWinningProfit(profit);
}
