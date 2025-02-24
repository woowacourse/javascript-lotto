import { PurchaseController } from "./controller/PurchaseController.js";
import { ResultController } from "./controller/ResultController.js";
import { WinningController } from "./controller/WinningController.js";
import { calculateProfitRate } from "./service/ProfitService.js";
import { displayCount, displayLotto, displayResultButton } from "./ui/displayLotto.js";
import { displayWinning } from "./ui/displayWinning.js";

const runLotto = () => {
  const purchaseButton = document.querySelector(".purchase-button");

  purchaseButton.addEventListener("click", async () => {
    const { lottoArray, lottoCount } = await PurchaseController();
    displayCount(lottoCount);
    displayLotto(lottoArray);
    displayWinning();
    displayResultButton();
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
