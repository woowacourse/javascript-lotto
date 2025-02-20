import CustomError from "../CustomError.js";
import { MESSAGES, SETTINGS } from "../constants/index.js";

export const bonusNumberValidator = (bonusNumber, winningNumbers) => {
  validateSingleNumber(bonusNumber);
  validateRange(bonusNumber);
  validateNoDuplicate(bonusNumber, winningNumbers);
};

const validateSingleNumber = (bonusNumber) => {
  if (isNaN(bonusNumber)) {
    throw new CustomError(MESSAGES.invalid.numberFormat);
  }

  if (!Number.isInteger(bonusNumber)) {
    throw new CustomError(MESSAGES.invalid.decimalNumber);
  }
};

const validateRange = (bonusNumber) => {
  if (
    bonusNumber < SETTINGS.numberRange.min ||
    bonusNumber > SETTINGS.numberRange.max
  ) {
    throw new CustomError(MESSAGES.invalid.bonusNumberRange);
  }
};

const validateNoDuplicate = (bonusNumber, winningNumbers) => {
  if (winningNumbers.includes(bonusNumber)) {
    throw new CustomError(MESSAGES.invalid.duplicateBonusNumber);
  }
};

export default bonusNumberValidator;
