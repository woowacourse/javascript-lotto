import { validateInteger } from './util.js';
import { LOTTO_PURCHASE_AMOUNT } from '../Constant/errorMessage.js';

const isInvalidPurchaseAmountUnit = (input) => {
  return input % 1_000 !== 0;
};

const isInvalidPurchaseAmountRange = (input) => {
  return input < 1_000 || input > 100_000;
};

const validatePurchaseAmountUnit = (input) => {
  if (isInvalidPurchaseAmountUnit(input)) {
    throw new Error(LOTTO_PURCHASE_AMOUNT.INVALID_PURCHASE_UNIT);
  }
};

const validatePurchaseAmountRange = (input) => {
  if (isInvalidPurchaseAmountRange(input)) {
    throw new Error(LOTTO_PURCHASE_AMOUNT.INVALID_PURCHASE_RANGE);
  }
};

export const validatePurchaseAmount = (input) => {
  validateInteger(input);
  validatePurchaseAmountUnit(input);
  validatePurchaseAmountRange(input);
};
