import { prepareCompare } from "./web/prepareCompare/prepareCompare.js";
import { winningResult } from "./web/winningResult/winningResult.js";
/**
 * step 2의 시작점이 되는 파일입니다.
 * 노드 환경에서 사용하는 readline 등을 불러올 경우 정상적으로 빌드할 수 없습니다.
 */
const resultButton = document.querySelector(".result_check_button");
const restartButton = document.querySelector(".restart");
const closeButton = document.querySelector(".close_button");
const modal = document.querySelector(".modal_overlay");
const purchaseInput = document.querySelector(".purchase_input");
const purchaseButton = document.querySelector(".purchase_button");
const resultSection = document.querySelector(".result_section");
const winningSection = document.querySelector(".winning_number_section");

document.addEventListener("DOMContentLoaded", () => {
  purchaseButton.addEventListener("click", handlePurchase);
  purchaseInput.addEventListener("keyup", handleEnterKey);
});

const handlePurchase = () => {
  const { purchaseAmount, lottoPack } = prepareCompare();

  if (purchaseAmount && lottoPack) {
    resultButton.removeEventListener("click", handleWinningResult);
    restartButton.removeEventListener("click", restart);
    closeButton.removeEventListener("click", closeModal);

    resultButton.addEventListener("click", () => handleWinningResult(purchaseAmount, lottoPack));
    restartButton.addEventListener("click", restart);
    closeButton.addEventListener("click", closeModal);
  }
};

const handleEnterKey = (event) => {
  if (event.key === "Enter") {
    handlePurchase();
  }
};

const handleWinningResult = (purchaseAmount, lottoPack) => {
  winningResult(purchaseAmount, lottoPack);
};

const closeModal = () => {
  modal.style.display = "none";
};

const restart = () => {
  document.querySelector(".purchase_input").value = "";
  const winningNumberInputs = document.querySelectorAll(".winning_number_input");
  [...winningNumberInputs].map((winningNumber) => {
    return (winningNumber.value = "");
  });
  document.querySelector(".bonus_number_input").value = "";
  modal.style.display = "none";
  resultSection.style.display = "none";
  winningSection.style.display = "none";
};
