import { LOTTO_NUMBERS } from './constants.js';

export const isCorrectPurchaseUnit = input => {
  return (
    Math.floor(input / LOTTO_NUMBERS.LOTTO_UNIT) ===
    input / LOTTO_NUMBERS.LOTTO_UNIT
  );
};

export const isUniqueWinningNumber = input => {
  const uniqueNums = new Set(Object.values(input));
  return uniqueNums.size === LOTTO_NUMBERS.WINNING_NUMBER_COUNT;
};
