import { ERROR } from './errorMessages.js';
import { LOTTO_SYSTEM } from '../constants/LottoSystem.js';
import { hasEmptyString, isValueInteger } from './validateInput.js';

export const validatePurchasePrice = (input) => {
  const value = Number(input);

  hasEmptyString(input);
  isValueInteger(value);

  if (value < LOTTO_SYSTEM.MIN_PURCHASE_PRICE) {
    throw new Error(ERROR.LOWER_THAN_MINIMUM_OF_PUCHASE_PRICE);
  }
};
