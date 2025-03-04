import setPurchaseDetailVisibility from "../setPurchaseDetailVisibility.js";
import resetWinningHistoryUI from "./resetWinningHistoryUI.js";
import resetInput from "../../utils/resetInput.js";

const reset = () => {
  const dialog = document.querySelector("dialog");
  dialog.close();
  const purchasedLottos = document.querySelector(".purchasedLottos");
  const winningNumberInputs = document.querySelectorAll(".winningNumberInput");
  const bonusNumberInput = document.querySelector(".bonusNumberInput");

  winningNumberInputs.forEach((input) => {
    resetInput(input);
  });
  resetInput(bonusNumberInput);

  resetWinningHistoryUI();
  purchasedLottos.textContent = "";
  setPurchaseDetailVisibility("off");
};

export default reset;
