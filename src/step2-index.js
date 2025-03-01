/**
 * step 2의 시작점이 되는 파일입니다.
 * 노드 환경에서 사용하는 readline 등을 불러올 경우 정상적으로 빌드할 수 없습니다.
 */

import { purchase, handlePurchase, handleWinningNumbers } from "./LottoStore.js";
import {
  validatePurchaseAmount,
  validateWinningNumbers,
  validateBonusNumber,
} from "./util/validate.js";

let purchaseAmount = 0;
let lottos = [];

document
  .getElementById("button-purchase")
  .addEventListener("click", async () => {
    const result = await handlePurchase();
    purchaseAmount = result.purchaseAmount;
    lottos = result.lottos;
  });

document
  .getElementById("input-purchase-amount")
  .addEventListener("input", (event) => {
    const inputValue = event.target.value;
    const button = document.getElementById("button-purchase");
    const helperText = document.getElementById("purchase-amount-helper-text");

    try {
      validatePurchaseAmount(inputValue);
      button.disabled = false;
      helperText.style.visibility = "hidden";
    } catch (error) {
      button.disabled = true;
      helperText.innerText = error.message.slice(8);
      helperText.style.visibility = "visible";
    }
  });

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

const inputs = Array.from(document.querySelectorAll(".lotto-input"));
const winningInputs = inputs.slice(0, -1);
const bonusInput = inputs.at(-1);
const buttonCheckResult = document.getElementById("button-check-result");
const winningsAndBonusHelperText = document.getElementById(
  "winnings-and-bonus-helper-text"
);

inputs.forEach((input) => {
  input.addEventListener("input", () => {
    
    const winningNumbers = winningInputs.map((input) => input.value).filter(value => value.trim() !== ""); // ✅ 현재 입력된 당첨 번호 가져오기
    const bonusNumber = bonusInput.value;

    handleWinningNumbers(lottos);

    try {
      validateWinningNumbers(winningNumbers.join(","));
      validateBonusNumber(bonusNumber, winningNumbers.join(","));
      buttonCheckResult.disabled = false;
      winningsAndBonusHelperText.style.visibility = "hidden";
    } catch (error) {
      buttonCheckResult.disabled = true;
      winningsAndBonusHelperText.style.visibility = "visible";
      winningsAndBonusHelperText.textContent = error.message.slice(8);
    }
  });
});
