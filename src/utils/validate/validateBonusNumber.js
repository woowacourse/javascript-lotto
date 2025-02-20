import {
  validateBonusNumberUnique,
  validateIsNumeric,
  validateLottoNumberRange,
} from "./validate.js";

export const validateBonusNumber = (winningNumber, bonusNumber) => {
  validateIsNumeric(bonusNumber);
  validateLottoNumberRange(bonusNumber);
  validateBonusNumberUnique(winningNumber, bonusNumber);
};
