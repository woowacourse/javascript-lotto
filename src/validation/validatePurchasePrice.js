import { ERROR } from '../constants/errors.js';
import { hasEmptyString, isValueInteger } from './validateInput.js';

export const validatePurchasePrice = (input) => {
  const value = Number(input);

  hasEmptyString(input);
  isValueInteger(value);

  if (value < 1000) {
    throw new Error(ERROR.LOWER_THAN_MINIMUM_OF_PUCHASE_PRICE);
  }
};
