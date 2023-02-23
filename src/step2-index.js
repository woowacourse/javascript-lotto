/**
 * step 2의 시작점이 되는 파일입니다.
 * 노드 환경에서 사용하는 readline 등을 불러올 경우 정상적으로 빌드할 수 없습니다.
 */
import "../style.css";
import { LottoGame } from "./domain/LottoGame";
import {
  validateBonusNumber,
  validatePurchaseAmount,
  validateWinningLottoNumbers,
} from "./domain/validator";
import { view } from "./view-web/view";

const lottoGame = new LottoGame(view);

const $purchaseAmountForm = document.getElementById("div-purchaseAmount");
const $purchaseAmountInput = document.getElementById("input-purchaseAmount");
const $lottos = document.querySelector(".lottos");
const $winningNumberInputs = document.querySelectorAll(".input-winningLotto");
const $bonusNumberInput = document.querySelector(".input-bonusNumber");
const $winningLottoForm = document.querySelector(".form-inputs-winningLotto");
const $statisticsModal = document.getElementById("modal-statistics");
const $closeButton = document.getElementById("close-button");
const $restartButton = document.getElementById("restart-button");

const $afterPurchaseDiv = document.getElementById("after-purchase");

$purchaseAmountForm.addEventListener("submit", (e) => {
  e.preventDefault();
  try {
    validatePurchaseAmount($purchaseAmountInput.value);

    lottoGame.lottoPurchase($purchaseAmountInput.value);
    lottoGame.showLottos();
    $afterPurchaseDiv.style.visibility = "visible";
  } catch (error) {
    return alert(error);
  }
});

$winningLottoForm.addEventListener("submit", (e) => {
  e.preventDefault();
  try {
    const winningLottoNumbers = [...$winningNumberInputs].map((input) => Number(input.value));
    const bonusNumber = Number($bonusNumberInput.value);

    validateWinningLottoNumbers(winningLottoNumbers);
    validateBonusNumber(bonusNumber, winningLottoNumbers);

    lottoGame.setWinningLotto(winningLottoNumbers, bonusNumber);
    lottoGame.showStatistics($purchaseAmountInput.value);
    $statisticsModal.showModal();
  } catch (error) {
    alert(error);
  }
});

$restartButton.addEventListener("click", (e) => {
  $purchaseAmountInput.value = "";
  $lottos.innerHTML = "";
  $winningNumberInputs.forEach((input) => (input.value = ""));
  $bonusNumberInput.value = "";
  $afterPurchaseDiv.style.visibility = "hidden";
  $statisticsModal.close();
});

$closeButton.addEventListener("click", () => $statisticsModal.close());
