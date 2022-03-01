import { AMOUNT, ERROR_MESSAGES, LOTTO_NUMBER } from "./constants.js";

const isValidMinimumAmount = (amount) => {
  return amount >= AMOUNT.MINIMUM;
};

const isValidAmountUnit = (amount) => {
  return amount % AMOUNT.UNIT === 0;
};

const isValidWinningNumbers = (numbers) => {
  return numbers.every(
    (number) => number >= LOTTO_NUMBER.RANGE_MIN && number <= LOTTO_NUMBER.RANGE_MAX,
  );
};

const isDuplicatedNumbers = (numbers) => {
  return numbers.length !== new Set(numbers).size;
};

export const verifyPurchaseAmount = (amount) => {
  if (!isValidMinimumAmount(amount)) {
    throw new Error(ERROR_MESSAGES.INVALID_MINIMUM_AMOUNT);
  }
  if (!isValidAmountUnit(amount)) {
    throw new Error(ERROR_MESSAGES.INVALID_AMOUNT_UNIT);
  }
};

export const verifyWinningNumbers = (numbers) => {
  if (!isValidWinningNumbers(numbers)) {
    throw new Error(ERROR_MESSAGES.INVALID_LOTTO_RANGE);
  }
  if (isDuplicatedNumbers(numbers)) {
    throw new Error(ERROR_MESSAGES.DUPLICATED_LOTTO_NUMBER);
  }
};
