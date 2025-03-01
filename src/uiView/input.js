import alertUntilValid from "../utils/alertUntilValid.js";
import { $, $$ } from "../utils/dom.js";
import validatePrice from "../validations/validatePrice.js";
import {
  validateBonusNumber,
  validateWinningNumbers,
} from "../validations/validateWinningNumbers.js";

export const getLottoPrice = () => {
  return alertUntilValid($(".purchase input").value, validatePrice);
};

export const getWinningNumbers = () => {
  const winningNumbersEl = $$(".winning-number");
  const winningNumbers = [...winningNumbersEl].map((winningNumber) => {
    return winningNumber.value;
  });
  return alertUntilValid(winningNumbers.join(","), validateWinningNumbers);
};

export const getBonusNumber = (winningNumbers) => {
  const bonusNumber = $(".bonus-number").value;
  return alertUntilValid(bonusNumber, (bonusNumber) =>
    validateBonusNumber(bonusNumber, winningNumbers)
  );
};
