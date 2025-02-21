import { LOTTO } from '../domain/lottoConstants.js';
import { ERROR } from './errorConstants.js';
import { hasEmptyString, isValueInteger } from './validateInput.js';

export const validatePurchasePrice = (input) => {
  const value = Number(input);

  hasEmptyString(input);
  isValueInteger(value);

  if (value < LOTTO.MIN_PURCHASE_PRICE) {
    throw new Error(ERROR.LOWER_THAN_MINIMUM_OF_PUCHASE_PRICE);
  }
};
