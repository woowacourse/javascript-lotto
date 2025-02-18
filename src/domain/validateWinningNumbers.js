import { ERROR_MESSAGE } from "../constants/error.js";

export const validateRange = (number) => {
  if (isNaN(number) || number < 1 || number > 45) {
    throw new Error(ERROR_MESSAGE.INVALID_LOTTO_NUMBER_RANGE);
  }
};

export const validateLength = (numbers) => {
  if (numbers.length !== 6) {
    throw new Error(ERROR_MESSAGE.INVALID_LOTTO_NUMBER_LENGTH);
  }
};

export const validateDuplicate = (numbers) => {
  if (new Set(numbers).size !== 6) {
    throw new Error(ERROR_MESSAGE.INVALID_LOTTO_DUPLICATE_NUMBER);
  }
};

export const validateWinningNumbers = (input) => {
  const numbers = input.split(",").map(Number);

  numbers.forEach((number) => validateRange(number));
  validateLength(numbers);
  validateDuplicate(numbers);

  return numbers;
};

export const validateBonusNumber = (bonusNumber, winningNumbers) => {
  validateRange(bonusNumber);

  if (winningNumbers.includes(bonusNumber)) {
    throw new Error(ERROR_MESSAGE.INVALID_BONUS_NUMBER);
  }

  return bonusNumber;
};
