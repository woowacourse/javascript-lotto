/**
 * step 2의 시작점이 되는 파일입니다.
 * 노드 환경에서 사용하는 readline 등을 불러올 경우 정상적으로 빌드할 수 없습니다.
 */

import { PRICE } from "./constants/price.js";
import buyLotto from "./event/buyLottos.js";
import showLottos from "./event/showLottos.js";
import { divideByUnit } from "./utils/count.js";

document.addEventListener("DOMContentLoaded", () => {
  buyLotto();
});

document.addEventListener("priceUpdated", (event) => {
  console.log("다른 컴포넌트에서 금액 확인:", event.detail);
  showLottos(divideByUnit(PRICE.UNIT, event.detail));
});
