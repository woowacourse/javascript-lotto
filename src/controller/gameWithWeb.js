import { PRICE } from "../constants/price.js";
import buyLotto from "../event/buyLottos.js";
import clickCheckResult from "../event/clickCheckResult.js";
import showLottos from "../event/showLottos.js";
import showResult from "../event/showResult.js";
import { divideByUnit } from "../utils/count.js";

const game = () => {
  buyLotto();

  document.addEventListener("priceUpdated", (event) => {
    console.log("다른 컴포넌트에서 금액 확인:", event.detail);
    showLottos(divideByUnit(PRICE.UNIT, event.detail));
  });

  clickCheckResult();
  showResult();
};

export default game;
