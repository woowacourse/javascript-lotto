/**
 * step 2의 시작점이 되는 파일입니다.
 * 노드 환경에서 사용하는 readline 등을 불러올 경우 정상적으로 빌드할 수 없습니다.
 */

import {
  handlePurchase,
  handleWinningNumbers,
  displayWinningDetails,
  handleResult,
} from "./LottoStore.js";
import {
  validatePurchaseAmount,
  validateWinningNumbers,
  validateBonusNumber,
} from "./util/validate.js";

let purchaseAmount = 0;
let lottos = [];
let winningRanks = {};

const inputPurchaseAmount = document.getElementById("input-purchase-amount");
const buttonPurchase = document.getElementById("button-purchase");
const contentBottom = document.getElementById("content-bottom");
const buttonCheckResult = document.getElementById("button-check-result");
const winningsAndBonusHelperText = document.getElementById(
  "winnings-and-bonus-helper-text"
);
const winningStasModal = document.getElementById("winning-stats-modal");
const buttonRestart = document.getElementById("button-restart");
const buttonCloseModal = document.getElementById("close-modal");
const winningStatsTableContent = document.getElementById(
  "winning-stats-table-content"
);

buttonPurchase.addEventListener("click", async () => {
  const result = await handlePurchase();
  purchaseAmount = result.purchaseAmount;
  lottos = result.lottos;

  //   contentBottom.classList.remove("hidden");
  contentBottom.style.visibility = "visible";
});

inputPurchaseAmount.addEventListener("input", (event) => {
  const inputValue = event.target.value;
  const helperText = document.getElementById("purchase-amount-helper-text");

  try {
    validatePurchaseAmount(inputValue);
    buttonPurchase.disabled = false;
    helperText.classList.add("hidden");
  } catch (error) {
    buttonPurchase.disabled = true;
    helperText.innerText = error.message.slice(8);
    helperText.classList.remove("hidden");
  }
});

inputPurchaseAmount.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    if (!buttonPurchase.disabled) {
      buttonPurchase.click();
      inputPurchaseAmount.blur();
    }
  }
});

const inputs = Array.from(document.querySelectorAll(".lotto-input"));
const winningInputs = inputs.slice(0, -1);
const bonusInput = inputs.at(-1);

document.querySelectorAll(".lotto-input").forEach((input, index, inputs) => {
  input.addEventListener("input", (event) => {
    const nextInput = inputs[index + 1];
    if (event.target.value.length === event.target.maxLength) {
      if (nextInput) {
        nextInput.focus();
      }
    }
  });
});

inputs.forEach((input) => {
  input.addEventListener("input", async () => {
    const winningNumbers = winningInputs
      .map((input) => input.value)
      .filter((value) => value.trim() !== "");
    const bonusNumber = bonusInput.value;

    try {
      validateWinningNumbers(winningNumbers.join(","));
      validateBonusNumber(bonusNumber, winningNumbers.join(","));
      buttonCheckResult.disabled = false;
      winningsAndBonusHelperText.classList.add("hidden");
      winningRanks = await handleWinningNumbers(lottos);
    } catch (error) {
      buttonCheckResult.disabled = true;
      winningsAndBonusHelperText.classList.remove("hidden");
      winningsAndBonusHelperText.textContent = error.message.slice(8);
    }
  });
});

document.getElementById("winning-form").addEventListener("submit", (event) => {
  event.preventDefault();
});

buttonCheckResult.addEventListener("click", () => {
  displayWinningDetails(winningRanks);
  handleResult(purchaseAmount, winningRanks);
  winningStasModal.showModal();
  winningStasModal.style.visibility = "visible";
  //   winningStasModal.classList.remove("hidden");
});

buttonRestart.addEventListener("click", () => {
  location.reload();
});

const closeWinningStatsModal = () => {
  winningStasModal.close();
  winningStasModal.style.visibility = "hidden";
  winningStasModal.classList.add("hidden");
  winningStatsTableContent.innerText = "";
};

buttonCloseModal.addEventListener("click", closeWinningStatsModal);

// Keyboard shortcuts
document.addEventListener("keydown", (event) => {
  if (
    event.key === "Escape" &&
    winningStasModal.style.visibility === "visible"
  ) {
    closeWinningStatsModal();
  }
});

document.addEventListener("keydown", (event) => {
  if (
    event.key === "Enter" &&
    winningStasModal.style.visibility === "visible"
  ) {
    buttonRestart.click();
  } else if (
    event.key === "Enter" &&
    !buttonPurchase.disabled &&
    !buttonCheckResult.disabled
  ) {
    buttonCheckResult.click();
  }
});
