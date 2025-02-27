import LottoGame from "./models/LottoGame.js";
import { getLottoPrice } from "./uiView/input.js";

// /**
//  * step 2의 시작점이 되는 파일입니다.
//  * 노드 환경에서 사용하는 readline 등을 불러올 경우 정상적으로 빌드할 수 없습니다.
//  */

const init = () => {
  const lottoGame = new LottoGame();

  const price = document
    .querySelector(".purchase button")
    .addEventListener("click", handlePurchaseClick);
};

const handlePurchaseClick = (e) => {
  const price = getLottoPrice();
  if (price) e.target.disabled = true;
};

init();
