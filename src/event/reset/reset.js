import lottoStore from "../../store/lottoStore.js";
import priceStore from "../../store/priceStore.js";
import setPurchaseDetailVisibility from "../setPurchaseDetailVisibility.js";
import resetWinningHistoryUI from "./resetWinningHistoryUI.js";

const reset = () => {
  priceStore.setPrice(0);
  lottoStore.setLottos([]);

  const dialog = document.querySelector("dialog");
  dialog.close();
  const purchasedLottos = document.querySelector(".purchasedLottos");
  const winningNumberInputs = document.querySelectorAll(".winningNumberInput");
  const bonusNumberInput = document.querySelector(".bonusNumberInput");

  winningNumberInputs.forEach((input) => {
    input.value = "";
  });

  resetWinningHistoryUI();
  bonusNumberInput.value = "";
  purchasedLottos.textContent = "";
  setPurchaseDetailVisibility("off");
};

export default reset;
