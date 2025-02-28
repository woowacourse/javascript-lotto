import { PurchaseController } from "./controller/PurchaseController.js";
import { ResultController } from "./controller/ResultController.js";
import { WinningController } from "./controller/WinningController.js";
import { purchaseHandler } from "./handler/purchaseHandler.js";
import { resultHandler } from "./handler/resultHandler.js";
import { calculateProfitRate } from "./service/ProfitService.js";
import { getOriginalApp, setOriginalApp } from "./state/state.js";
import { disabledButton } from "./util/buttonActions.js";

export const purchaseLotto = async () => {
  const { lottoArray, lottoCount } = await PurchaseController();
  purchaseHandler(lottoCount, lottoArray);
  disabledButton("purchase");
};

export const showResult = async (lottoCount, lottoArray) => {
  const winningLotto = await WinningController();
  const matchingCount = ResultController(winningLotto, lottoArray);
  const profitRate = calculateProfitRate(matchingCount, lottoCount);

  resultHandler(matchingCount, profitRate);
};

export const retry = () => {
  const originalApp = getOriginalApp();
  const currentApp = document.querySelector("#app");
  if (originalApp) {
    currentApp.replaceChildren(...originalApp.children);
  }
  runLotto();
};

const runLotto = () => {
  const originalApp = document.querySelector("#app");
  setOriginalApp(originalApp);
  document.querySelector("[name=purchase]").addEventListener("click", () => {
    purchaseLotto();
  });
};
runLotto();
