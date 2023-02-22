/**
 * step 2의 시작점이 되는 파일입니다.
 * 노드 환경에서 사용하는 readline 등을 불러올 경우 정상적으로 빌드할 수 없습니다.
 */
import "../style.css";
import { LottoGame } from "./domain/LottoGame";
import { view } from "./view-web/view";

const lottoGame = new LottoGame(view);

const $purchaseAmountForm = document.getElementById("div-purchaseAmount");

$purchaseAmountForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const $purchaseAmountInput = document.getElementById("input-purchaseAmount");
  lottoGame.lottoPurchase($purchaseAmountInput.value);
  lottoGame.showLottos();
});
