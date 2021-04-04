import { LOTTO_NUMBERS } from './utils/constants.js';
import { changeObjectToSet } from './utils/utils.js';

export const isCorrectPurchaseUnit = input => {
  return Math.floor(input / LOTTO_NUMBERS.LOTTO_UNIT) === input / LOTTO_NUMBERS.LOTTO_UNIT;
};

export const isUniqueNumbers = (input, sizeOfNumber) => {
  return changeObjectToSet(input).size === sizeOfNumber;
};
