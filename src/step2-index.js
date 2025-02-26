import { PurchaseController } from "./controller/PurchaseController.js";
import { ResultController } from "./controller/ResultController.js";
import { WinningController } from "./controller/WinningController.js";
import { initialHandler } from "./handler/initialHandler.js";
import { purchaseHandler } from "./handler/purchaseHandler.js";
import { resultHandler } from "./handler/resultHandler.js";
import { calculateProfitRate } from "./service/ProfitService.js";

const runLotto = () => {
  initialHandler();
};

export const purchaseLotto = async () => {
  const purchaseButton = document.querySelector(`[name=purchase]`);
  const { lottoArray, lottoCount } = await PurchaseController();
  purchaseHandler(lottoCount, lottoArray);

  purchaseButton.disabled = true;
};

export const showResult = async (lottoCount, lottoArray) => {
  const winningLotto = await WinningController();
  const matchingCount = ResultController(winningLotto, lottoArray);
  const profitRate = calculateProfitRate(matchingCount, lottoCount);

  resultHandler(matchingCount, profitRate);
  console.log(matchingCount, profitRate);
};

runLotto();
