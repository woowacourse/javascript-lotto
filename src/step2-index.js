/**
 * step 2의 시작점이 되는 파일입니다.
 * 노드 환경에서 사용하는 readline 등을 불러올 경우 정상적으로 빌드할 수 없습니다.
 */
import { SETTINGS } from "./constants/index.js";
import LottoController from "./controller/LottoController.js";
import { initPurchaseUI, resetPurchaseUI } from "./view/purchaseView.js";
import { showModal, updateModalContent, restartModal } from "./view/modalView.js";

const lottoController = new LottoController();

const winningNumberInputs = [
  document.getElementById("winning-number-input-1"),
  document.getElementById("winning-number-input-2"),
  document.getElementById("winning-number-input-3"),
  document.getElementById("winning-number-input-4"),
  document.getElementById("winning-number-input-5"),
  document.getElementById("winning-number-input-6")
];
const bonusInput = document.getElementById("bonus-input");
const winningResultButton = document.getElementById("winning-result-button");

initPurchaseUI(lottoController);

const checkAllValid = () => {
  for (const input of winningNumberInputs) {
    const value = input.value.trim();
    if (value === "" || isNaN(Number(value))) {
      winningResultButton.disabled = true;
      return;
    }

    if ((Number(input.value) < SETTINGS.numberRange.min || Number(input.value) > SETTINGS.numberRange.max)) {
      winningResultButton.disabled = true;
      return;
    }
  }

  const bonusValue = bonusInput.value.trim();
  if (bonusValue === "" || isNaN(Number(bonusValue))) {
    winningResultButton.disabled = true;
    return;
  }

  if ((Number(bonusValue) < SETTINGS.numberRange.min || Number(bonusValue) > SETTINGS.numberRange.max)) {
    winningResultButton.disabled = true;
    return;
  }

  winningResultButton.disabled = false;
};

[...winningNumberInputs, bonusInput].forEach((input) => {
  input.addEventListener("input", checkAllValid);
});

winningResultButton.addEventListener("click", () => {
  const winningNumbers = winningNumberInputs.map(input => Number(input.value.trim()));
  const bonusNumber = Number(bonusInput.value.trim());

  try {
    lottoController.matchLottoNumbers(winningNumbers, bonusNumber);
    const results = lottoController.calculateAndDisplayResults();
    updateModalContent(results);
    showModal();
  } catch (error) {
    alert(error.message);
    winningResultButton.disabled = true;
  }
});

const resetModalUI = () => {
  resetPurchaseUI();
  winningNumberInputs.forEach((input) => input.value = "");
  bonusInput.value = "";
};

restartModal(resetModalUI);
