import {
  validateIsNumeric,
  validateLottoNumberRange,
  validateWinningNumberDuplicate,
  validateWinningNumbersLength,
} from "./validate.js";

export const validateWinningNumbers = (winningNumbers) => {
  winningNumbers.forEach((number) => {
    validateIsNumeric(number);
    validateLottoNumberRange(number);
  });
  validateWinningNumberDuplicate(winningNumbers);
  validateWinningNumbersLength(winningNumbers);
};
