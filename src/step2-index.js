/**
 * step 2의 시작점이 되는 파일입니다.
 * 노드 환경에서 사용하는 readline 등을 불러올 경우 정상적으로 빌드할 수 없습니다.
 */

import { PURCHASE } from "./config/const.js";
import LottoGenerator from "./domain/LottoGenerator.js";

document.addEventListener("DOMContentLoaded", () => {
  const purchaseButton = document.querySelector("#purchase-button");
  purchaseButton.addEventListener("click", purchase);
});

function purchase() {
  const purchaseInput = document.querySelector("#purchase-input");
  const price = Number(purchaseInput.value);
  const generatedLottos = LottoGenerator.getGenerateLottos(price);
  console.log(generatedLottos);

  const lottoCountSpan = document.querySelector("#lotto-count-message");
  lottoCountSpan.textContent = `총 ${Number(
    price / PURCHASE.UNIT
  )}개를 구매하였습니다.`;

  purchaseInput.value = "";

  const ul = document.querySelector("#generated-lottos");
  generatedLottos.forEach((lotto) => {
    const li = document.createElement("li");
    li.textContent = `🎟️ ${lotto.join(", ")}`;
    ul.appendChild(li);
  });
}
