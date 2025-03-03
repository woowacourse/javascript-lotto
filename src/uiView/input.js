import validateWithAlert from "../utils/validateWithAlert.js";
import { $, $$ } from "../utils/dom.js";
import validatePrice from "../validations/validatePrice.js";
import {
  validateBonusNumber,
  validateWinningNumbers,
} from "../validations/validateWinningNumbers.js";

export const getLottoPrice = () => {
  return validateWithAlert($(".purchase input").value, validatePrice);
};

export const getWinningNumbers = () => {
  const winningNumbersEl = $$(".winning-number");
  const winningNumbers = [...winningNumbersEl].map((winningNumber) => {
    return winningNumber.value;
  });
  return validateWithAlert(winningNumbers.join(","), validateWinningNumbers);
};

export const getBonusNumber = (winningNumbers) => {
  const bonusNumber = $(".bonus-number").value;
  return validateWithAlert(bonusNumber, (bonusNumber) =>
    validateBonusNumber(bonusNumber, winningNumbers)
  );
};
