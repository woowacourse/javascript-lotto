import {
  BONUS_NUMBER_ERROR_MESSAGES,
  MIN_LOTTO_NUMBER,
  MAX_LOTTO_NUMBER,
} from "../constants/constants.js";

const validateBonusNumber = (input, winningNumbers) => {
  const bonusNumber = Number(input);

  if (Number.isNaN(bonusNumber)) {
    throw new Error(BONUS_NUMBER_ERROR_MESSAGES.NOT_A_NUMBER);
  }
  if (!Number.isInteger(bonusNumber)) {
    throw new Error(BONUS_NUMBER_ERROR_MESSAGES.NOT_AN_INTEGER);
  }
  if (MIN_LOTTO_NUMBER > bonusNumber || MAX_LOTTO_NUMBER < bonusNumber) {
    throw new Error(BONUS_NUMBER_ERROR_MESSAGES.OUT_OF_RANGE);
  }
  if (winningNumbers.includes(bonusNumber)) {
    throw new Error(BONUS_NUMBER_ERROR_MESSAGES.DUPLICATE_NUMBER);
  }

  return bonusNumber;
};

export default validateBonusNumber;
