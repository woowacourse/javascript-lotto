import retryUntilValid from "../utils/retryUntilValidUI.js";
import validatePrice from "../validations/validatePrice.js";
import {
  validateBonusNumber,
  validateWinningNumbers,
} from "../validations/validateWinningNumbers.js";

export const getLottoPrice = () => {
  return retryUntilValid(
    document.querySelector(".purchase input").value,
    validatePrice
  );
};

export const getWinningNumbers = () => {
  const winningNumbersEl = document.querySelectorAll(".winning-number");
  const winningNumbers = [...winningNumbersEl].map((winningNumber) => {
    return winningNumber.value;
  });
  return retryUntilValid(winningNumbers.join(","), validateWinningNumbers);
};

export const getBonusNumber = (winningNumbers) => {
  const bonusNumber = document.querySelector(".bonus-number").value;
  return retryUntilValid(bonusNumber, (bonusNumber) =>
    validateBonusNumber(bonusNumber, winningNumbers)
  );
};
