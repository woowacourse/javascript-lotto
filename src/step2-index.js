/**
 * step 2의 시작점이 되는 파일입니다.
 * 노드 환경에서 사용하는 readline 등을 불러올 경우 정상적으로 빌드할 수 없습니다.
 */
import LottoController from "./controller/LottoController.js";
import { initPurchaseUI, resetPurchaseUI } from "./view/purchaseView.js";
import { resetLottoTicketsUI } from "./view/ticketView.js";
import { showModal, updateModalContent, restartModal } from "./view/modalView.js";
import { SETTINGS } from "./constants/index.js";

const lottoController = new LottoController();

initPurchaseUI(lottoController);

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

winningNumberInputs.forEach(input =>
  input.setAttribute("maxlength", "2"));

bonusInput.setAttribute("maxlength", "2");

winningNumberInputs.forEach((input, index) => {
  input.addEventListener("input", (event) => {
    if (input.value.length === Number(input.getAttribute("maxlength"))) {
      if (index < winningNumberInputs.length - 1) {
        winningNumberInputs[index + 1].focus();
      }
    }
  });

  input.addEventListener("keydown", (event) => {
    if (event.key === "Backspace" && input.value === "") {
      if (index > 0) {
        winningNumberInputs[index - 1].focus();
      }
    }
  });
});

const checkAllValid = () => {
  for (const input of winningNumberInputs) {
    const value = input.value;
    if (value === "") {
      winningResultButton.disabled = true;
      return;
    }

    if (input.value < SETTINGS.numberRange.min || input.value > SETTINGS.numberRange.max) {
      winningResultButton.disabled = true;
      return;
    }
  }

  const bonusValue = bonusInput.value;
  if (bonusValue === "") {
    winningResultButton.disabled = true;
    return;
  }

  if (bonusValue < SETTINGS.numberRange.min || bonusValue > SETTINGS.numberRange.max) {
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
  resetLottoTicketsUI();
  winningNumberInputs.forEach((input) => input.value = "");
  bonusInput.value = "";
};

restartModal(resetModalUI);
