import { ERROR_MESSAGE } from "../constants/error.js";
import { LOTTO } from "../constants/lotto.js";

export const isNumber = (input) => {
  const regex = /^[0-9]*$/;

  return regex.test(input);
};

export const isValidPriceUnit = (input) => {
  return input % LOTTO.PRICE_STEP == 0;
};

export const isValidPriceRange = (input) => {
  return input >= LOTTO.MIN_PRICE && input <= LOTTO.MAX_PRICE;
};

const validatePrice = (input) => {
  if (!isNumber(input)) throw new Error(ERROR_MESSAGE.INVALID_NUMBER);

  const price = Number(input);
  if (!isValidPriceUnit(price))
    throw new Error(ERROR_MESSAGE.INVALID_PRICE_UNIT);
  if (!isValidPriceRange(price))
    throw new Error(ERROR_MESSAGE.INVALID_PRICE_RANGE);

  return price;
};

export default validatePrice;
