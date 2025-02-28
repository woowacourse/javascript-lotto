/**
 * step 2의 시작점이 되는 파일입니다.
 * 노드 환경에서 사용하는 readline 등을 불러올 경우 정상적으로 빌드할 수 없습니다.
 */

import handlePurchase from "./view/web/handlePurchase";
import handleRestart from "./view/web/handleRestart";
import handleWinningCheck from "./view/web/handleWinningCheck";

const purchase_button = document.querySelector("#purchaseButton");
const purchase_amount_input = document.querySelector("#purchaseAmount");
const reuslt_button = document.querySelector(".reuslt_button_section #resultButton");
const lotto_result_modal = document.querySelector(".lotto_result_modal");
const restart_button = document.querySelector("#restartButton");

purchase_button.addEventListener("click", () => {
  const { purchaseAmount, lottoPack } = handlePurchase();
  reuslt_button.addEventListener("click", () => handleWinningCheck(purchaseAmount, lottoPack));
});

purchase_amount_input.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    purchase_button.click();
  }
});

lotto_result_modal.addEventListener("click", (e) => {
  if (e.target === e.currentTarget) lotto_result_modal.close();
});

restart_button.addEventListener("click", () => handleRestart());
