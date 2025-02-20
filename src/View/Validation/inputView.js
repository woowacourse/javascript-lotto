import {
  COMMON_ERROR_MESSAGE,
  LOTTO_PURCHASE_AMOUNT,
} from '../Constant/errorMessage.js';

const hasEmptySpace = (input) => {
  return input.includes(' ') || input.trim() === '';
};

const isInteger = (input) => {
  return Number.isInteger(input);
};

const isInvalidPurchaseAmountUnit = (input) => {
  return input % 1_000 !== 0;
};

const isInvalidPurchaseAmountRange = (input) => {
  return input < 1_000 || input > 100_000;
};

export const validateEmptySpace = (input) => {
  if (hasEmptySpace(input)) {
    throw new Error(`${COMMON_ERROR_MESSAGE.NO_EMPTY_SPACE}`);
  }
};

const validateInteger = (input) => {
  if (isInteger(input) === false) {
    throw new Error(`${COMMON_ERROR_MESSAGE.NOT_INTEGER}`);
  }
};

const validatePurchaseAmountUnit = (input) => {
  if (isInvalidPurchaseAmountUnit(input)) {
    throw new Error(LOTTO_PURCHASE_AMOUNT.INVALID_PURCHASE_UNIT);
  }
};

const validatePurchaseAmountRange = (input) => {
  if (isInvalidPurchaseAmountRange(input)) {
    throw new Error(LOTTO_PURCHASE_AMOUNT.INVALID_MAX_PURCHASE);
  }
};

export const validatePurchaseAmount = (input) => {
  validateInteger(input);
  validatePurchaseAmountUnit(input);
  validatePurchaseAmountRange(input);
};
