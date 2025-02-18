import { ERROR_MESSAGE } from "../constants/error.js";

export const validateRange = (numbers) => {
  if (isNaN(numbers) || numbers.some((number) => number < 1 || number > 45)) {
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

const validateWinningNumbers = (input) => {
  const numbers = input.split(",");

  validateRange(numbers);
  validateLength(numbers);
  validateDuplicate(numbers);

  return numbers;
};

export default validateWinningNumbers;
