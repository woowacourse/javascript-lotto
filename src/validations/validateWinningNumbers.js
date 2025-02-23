import { ERROR_MESSAGE } from "../constants/error.js";
import { LOTTO } from "../constants/lotto.js";

export const validateRange = (number) => {
  if (
    isNaN(number) ||
    number < LOTTO.MIN_LOTTO_NUMBER ||
    number > LOTTO.MAX_LOTTO_NUMBER
  ) {
    throw new Error(ERROR_MESSAGE.INVALID_LOTTO_NUMBER_RANGE);
  }
};

export const validateLength = (numbers) => {
  if (numbers.length !== LOTTO.LOTTO_NUMBER_COUNT) {
    throw new Error(ERROR_MESSAGE.INVALID_LOTTO_NUMBER_LENGTH);
  }
};

export const validateDuplicate = (numbers) => {
  if (new Set(numbers).size !== LOTTO.LOTTO_NUMBER_COUNT) {
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

  if (winningNumbers.includes(Number(bonusNumber))) {
    throw new Error(ERROR_MESSAGE.INVALID_BONUS_NUMBER);
  }

  return Number(bonusNumber);
};
