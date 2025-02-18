import { ERROR } from '../constants/errors.js';

export const validatePurchasePrice = (input) => {
  const value = Number(input);
  if (value === '') {
    throw new Error(ERROR.IS_PURCHASE_PRICE_EMPTY);
  }

  if (!Number.isInteger(value) || value < 1000) {
    throw new Error(ERROR.IS_LOWER_THAN_MINIMUM_OF_PUCHASE_PRICE);
  }
};
