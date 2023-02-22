/**
 * step 2의 시작점이 되는 파일입니다.
 * 노드 환경에서 사용하는 readline 등을 불러올 경우 정상적으로 빌드할 수 없습니다.
 */
import "../style.css";
import { LottoGame } from "./domain/LottoGame";
import { view } from "./view-web/view";

const lottoGame = new LottoGame(view);

const $purchaseAmountForm = document.getElementById("div-purchaseAmount");
const $purchaseAmountInput = document.getElementById("input-purchaseAmount");
const $lottos = document.querySelector(".lottos");
const $winningNumberInputs = document.querySelectorAll(".input-winningLotto");
const $bonusNumberInput = document.querySelector(".input-bonusNumber");
const $resultButton = document.getElementById("button-result");
const $statisticsModal = document.getElementById("modal-statistics");
const $restartButton = document.getElementById("restart-button");

const $afterPurchaseDiv = document.getElementById("after-purchase");

$purchaseAmountForm.addEventListener("submit", (e) => {
  e.preventDefault();
  lottoGame.lottoPurchase($purchaseAmountInput.value);
  lottoGame.showLottos();
  $afterPurchaseDiv.style.visibility = "visible";
});

$resultButton.addEventListener("click", (e) => {
  const winningLottoNumbers = [...$winningNumberInputs].map((input) => Number(input.value));
  const bonusNumber = Number($bonusNumberInput.value);
  lottoGame.setWinningLotto(winningLottoNumbers, bonusNumber);
  lottoGame.showStatistics($purchaseAmountInput.value);
  $statisticsModal.showModal();
});

$restartButton.addEventListener("click", (e) => {
  $purchaseAmountInput.value = "";
  $lottos.innerHTML = "";
  $winningNumberInputs.forEach((input) => (input.value = ""));
  $bonusNumberInput.value = "";
  $afterPurchaseDiv.style.visibility = "hidden";
  $statisticsModal.close();
});
