import { PRICE } from "../constants/price.js";
import buyLotto from "../event/buyLottos.js";
import clickCheckResult from "../event/clickCheckResult.js";
import showLottos from "../event/showLottos.js";
import showResult from "../event/showResult.js";
import { divideByUnit } from "../utils/count.js";
import reset from "../event/reset.js";

const game = () => {
  const buyButton = document.querySelector(".buyButton");

  buyButton.addEventListener("click", () => {
    buyLotto();
  });

  document.addEventListener("priceUpdated", (event) => {
    console.log("다른 컴포넌트에서 금액 확인:", event.detail);
    showLottos(divideByUnit(PRICE.UNIT, event.detail));
  });

  const checkResultButton = document.querySelector(".checkResultButton");

  checkResultButton.addEventListener("click", () => {
    clickCheckResult();
  });

  document.addEventListener("checkResult", (event) => {
    showResult(event);
  });

  const resetButton = document.querySelector("#reset");
  resetButton.addEventListener("click", () => {
    reset();
  });
};

export default game;
