import { ERROR } from '../constants/errors.js';

export const hasEmptyString = (input) => {
  if (input === '') {
    throw new Error(ERROR.IS_PURCHASE_PRICE_EMPTY);
  }
};

export const isValueInteger = (input) => {
  if (!Number.isInteger(input)) {
    throw new Error(ERROR.IS_NOT_POSITIVE_INTEGER);
  }
};

export const validatePurchasePrice = (input) => {
  const value = Number(input);

  hasEmptyString(input);
  isValueInteger(value);

  if (value < 1000) {
    throw new Error(ERROR.IS_LOWER_THAN_MINIMUM_OF_PUCHASE_PRICE);
  }
};
