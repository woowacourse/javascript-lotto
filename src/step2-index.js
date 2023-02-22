/**
 * step 2의 시작점이 되는 파일입니다.
 * 노드 환경에서 사용하는 readline 등을 불러올 경우 정상적으로 빌드할 수 없습니다.
 */
import "../style.css";
import { LottoGame } from "./domain/LottoGame";
import { view } from "./view-web/view";

const lottoGame = new LottoGame(view);

const $purchaseAmountForm = document.getElementById("div-purchaseAmount");
const $resultButton = document.getElementById("button-result");

const $purchaseAmountInput = document.getElementById("input-purchaseAmount");

$purchaseAmountForm.addEventListener("submit", (e) => {
  e.preventDefault();
  lottoGame.lottoPurchase($purchaseAmountInput.value);
  lottoGame.showLottos();
});

$resultButton.addEventListener("click", (e) => {
  const $statisticsModal = document.getElementById("modal-statistics");
  const winningLottoNumbers = [...document.querySelectorAll(".input-winningLotto")].map((input) =>
    Number(input.value)
  );
  const bonusNumber = Number(document.querySelector(".input-bonusNumber").value);
  lottoGame.setWinningLotto(winningLottoNumbers, bonusNumber);
  lottoGame.showStatistics($purchaseAmountInput.value);
  $statisticsModal.showModal();
});
