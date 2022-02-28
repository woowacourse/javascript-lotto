import { AMOUNT, LOTTO_NUMBER } from "./constants.js";

export const isValidMinimumAmount = (amount) => {
  return amount >= AMOUNT.MINIMUM;
};

export const isValidAmountUnit = (amount) => {
  return amount % AMOUNT.UNIT === 0;
};

export const isValidWinningNumbers = (numbers) => {
  return numbers.every(
    (number) => number >= LOTTO_NUMBER.RANGE_MIN && number <= LOTTO_NUMBER.RANGE_MAX,
  );
};

export const isDuplicatedNumbers = (numbers) => {
  return numbers.length !== new Set(numbers).size;
};
