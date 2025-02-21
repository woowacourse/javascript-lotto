import { ERROR_MESSAGE } from "../constants/error.js";

const MIN_PRICE = 1_000;
const MAX_PRICE = 1_000_000;

export const isNumber = (input) => {
  const regex = /^[0-9]*$/;

  return regex.test(input);
};

export const isThousandUnit = (input) => {
  return input % 1000 == 0;
};

export const isValidPriceRange = (input) => {
  return input >= MIN_PRICE && input <= MAX_PRICE;
};

const validatePrice = (input) => {
  if (!isNumber(input)) throw new Error(ERROR_MESSAGE.INVALID_NUMBER);

  const price = Number(input);
  if (!isThousandUnit(price))
    throw new Error(ERROR_MESSAGE.INVALID_THOUSAND_UNIT);
  if (!isValidPriceRange(price))
    throw new Error(ERROR_MESSAGE.INVALID_PRICE_RANGE);

  return price;
};

export default validatePrice;
