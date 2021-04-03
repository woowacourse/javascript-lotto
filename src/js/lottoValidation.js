import { LOTTO_NUMBERS } from './utils/constants.js';
import { changeObjectToSet } from './utils/utils.js';

export const isCorrectPurchaseUnit = input => {
  return (
    Math.floor(input / LOTTO_NUMBERS.LOTTO_UNIT) ===
    input / LOTTO_NUMBERS.LOTTO_UNIT
  );
};

export const isUniqueWinningNumber = input => {
  return changeObjectToSet(input).size === LOTTO_NUMBERS.WINNING_NUMBER_COUNT;
};
