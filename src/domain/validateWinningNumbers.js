import { ERROR_MESSAGE } from "../constants/error.js";

export const validateLottoNumberRange = (numbers) => {
  if (isNaN(numbers) || numbers.some((number) => number < 1 || number > 45)) {
    throw new Error(ERROR_MESSAGE.INVALID_LOTTO_NUMBER_RANGE);
  }
};
