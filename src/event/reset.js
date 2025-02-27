import lottoStore from "../store/lottoStore.js";
import priceStore from "../store/priceStore.js";
import setPurchaseDetailVisibility from "./setPurchaseDetailVisibility.js";

const reset = () => {
  priceStore.setPrice(0);
  lottoStore.setLottos([]);

  const dialog = document.querySelector("dialog");
  dialog.close();
  const purchaseDetail = document.querySelector(".purchaseDetail");
  const purchasedLottos = document.querySelector(".purchasedLottos");
  const winningNumberInputs = document.querySelectorAll(".winningNumberInput");
  const bonusNumberInput = document.querySelector(".bonusNumberInput");
  const winningCount = document.querySelectorAll(".winningCount");

  winningNumberInputs.forEach((input) => {
    input.value = "";
  });
  winningCount.forEach((count) => {
    count.textContent = "0개";
  });
  bonusNumberInput.value = "";
  purchasedLottos.textContent = "";
  setPurchaseDetailVisibility("off");
};

export default reset;
