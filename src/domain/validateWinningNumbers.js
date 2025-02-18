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
