import { ResultController } from "../controller/ResultController.js";
import { WinningController } from "../controller/WinningController.js";
import { calculateProfitRate } from "../service/ProfitService.js";
import WebOutputView from "../view/WebOutputView.js";

export const resultHandler = async (lottoCount, lottoArray) => {
  const winningLotto = await WinningController();
  const matchingCount = ResultController(winningLotto, lottoArray);
  const profitRate = calculateProfitRate(matchingCount, lottoCount);

  WebOutputView.renderResult(matchingCount, profitRate);
};
