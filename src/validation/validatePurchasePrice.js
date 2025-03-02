import { ERROR } from './errorMessages.js';
import { LOTTO_SYSTEM } from '../constants/LottoSystem.js';
import { hasEmptyString, isValueInteger } from './validateInput.js';

export const validatePurchasePrice = (input) => {
  const value = Number(input);

  if (hasEmptyString(input)) throw new Error(ERROR.EMPTY_VALUE);
  if (!isValueInteger(value)) throw new Error(ERROR.NOT_POSITIVE_INTEGER);

  if (value < LOTTO_SYSTEM.MIN_PURCHASE_PRICE) {
    throw new Error(ERROR.LOWER_THAN_MINIMUM_OF_PUCHASE_PRICE);
  }
};
