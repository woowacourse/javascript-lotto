import { NUMBERS } from './constants.js';

export const isCorrectPurchaseUnit = input => {
  return Math.floor(input / NUMBERS.LOTTO_UNIT) === input / NUMBERS.LOTTO_UNIT;
};
