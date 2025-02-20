import { ERROR_MESSAGE } from "../constants/error.js";

const MIN_PRICE = 1_000;
const MAX_PRICE = 1_000_000;

export const isNumber = (input) => {
  const regex = /^[0-9]*$/;

  if (!regex.test(input)) {
    throw new Error(ERROR_MESSAGE.INVALID_NUMBER);
  }
};

export const isThousandUnit = (input) => {
  if (input % 1000 !== 0) {
    throw new Error(ERROR_MESSAGE.INVALID_THOUSAND_UNIT);
  }
};

export const isValidPriceRange = (input) => {
  if (input < MIN_PRICE || input > MAX_PRICE) {
    throw new Error(ERROR_MESSAGE.INVALID_PRICE_RANGE);
  }
};

const validatePrice = (input) => {
  isNumber(input);

  const price = Number(input);
  isThousandUnit(price);
  isValidPriceRange(price);

  return price;
};

export default validatePrice;
