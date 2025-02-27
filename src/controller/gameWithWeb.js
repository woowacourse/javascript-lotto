import { PRICE } from "../constants/price.js";
import buyLotto from "../event/buyLottos.js";
import clickCheckResult from "../event/clickCheckResult.js";
import showLottos from "../event/showLottos.js";
import showResult from "../event/showResult.js";
import { divideByUnit } from "../utils/count.js";
import reset from "../event/reset.js";
import priceStore from "../store/priceStore.js";

const game = () => {
  const buyButton = document.querySelector(".buyButton");
  buyButton.addEventListener("click", () => {
    buyLotto();
  });

  document.addEventListener("priceUpdated", () => {
    showLottos(divideByUnit(PRICE.UNIT, priceStore.getPrice()));
  });

  const checkResultButton = document.querySelector(".checkResultButton");
  checkResultButton.addEventListener("click", () => {
    clickCheckResult();
  });

  document.addEventListener("checkResult", (event) => {
    showResult(event.detail);
  });

  const resetButton = document.querySelector("#reset");
  resetButton.addEventListener("click", () => {
    reset();
  });

  const closeButton = document.querySelector("#closeButton");
  closeButton.addEventListener("click", () => {
    const dialog = document.querySelector("dialog");
    dialog.close();
  });
};

export default game;
