import { PurchaseController } from "./controller/PurchaseController.js";
import { ResultController } from "./controller/ResultController.js";
import { WinningController } from "./controller/WinningController.js";
import { purchaseHandler } from "./handler/purchaseHandler.js";
import { calculateProfitRate } from "./service/ProfitService.js";

const runLotto = () => {
  const purchaseButton = document.querySelector(".purchase-button");

  purchaseButton.addEventListener("click", async () => {
    const { lottoArray, lottoCount } = await PurchaseController();
    purchaseHandler(lottoCount, lottoArray);

    purchaseButton.disabled = true;

    const resultButton = document.querySelector(".result-button-container");
    resultButton.addEventListener("click", async () => {
      const winningLotto = await WinningController();
      const matchingCount = ResultController(winningLotto, lottoArray);
      const profitRate = calculateProfitRate(matchingCount, lottoCount);
      console.log(matchingCount, profitRate);
    });
  });
};

runLotto();
