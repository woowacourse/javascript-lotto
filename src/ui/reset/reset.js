import setPurchaseDetailVisibility from "../../event/setPurchaseDetailVisibility.js";
import resetWinningHistoryUI from "./resetWinningHistoryUI.js";
import resetInput from "../../utils/resetInput.js";

const reset = () => {
  const dialog = document.querySelector("dialog");
  dialog.close();
  const purchasedLottos = document.querySelector(".purchase-detail__lottos");
  const winningNumberInputs = document.querySelectorAll(
    ".purchase-detail__winning-input"
  );
  const bonusNumberInput = document.querySelector(
    ".purchase-detail__bonus-input"
  );

  winningNumberInputs.forEach((input) => {
    resetInput(input);
  });
  resetInput(bonusNumberInput);

  resetWinningHistoryUI();
  purchasedLottos.textContent = "";
  setPurchaseDetailVisibility(false);
};

export default reset;
