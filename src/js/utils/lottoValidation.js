import { LOTTO_NUMBERS } from './constants.js';

export const isCorrectPurchaseUnit = input => {
  return (
    Math.floor(input / LOTTO_NUMBERS.LOTTO_UNIT) ===
    input / LOTTO_NUMBERS.LOTTO_UNIT
  );
};

export const isUniqueManualNumber = input => {
  return new Set(input).size === LOTTO_NUMBERS.LOTTO_MANUAL_COUNT;
};

export const isUniqueWinningNumber = input => {
  return new Set(input).size === LOTTO_NUMBERS.WINNING_NUMBER_COUNT;
};
