import { AMOUNT, ERROR_MESSAGES, LOTTO_NUMBER } from "./constants.js";

export const isUnderMinimumAmount = (amount) => {
  return amount < AMOUNT.MINIMUM;
};

export const isOverMaximumAmount = (amount) => {
  return amount > AMOUNT.MAXIMUM;
};

export const isUnderAmountUnit = (amount) => {
  return amount % AMOUNT.UNIT !== 0;
};

export const hasOverRangeWinningNumber = (numbers) => {
  return numbers.some(
    (number) => number < LOTTO_NUMBER.RANGE_MIN || number > LOTTO_NUMBER.RANGE_MAX,
  );
};

export const hasDuplicatedNumber = (numbers) => {
  return numbers.length !== new Set(numbers).size;
};

export const verifyPurchaseAmount = (amount) => {
  if (isUnderMinimumAmount(amount)) {
    throw new Error(ERROR_MESSAGES.INVALID_MINIMUM_AMOUNT);
  }
  if (isOverMaximumAmount(amount)) {
    throw new Error(ERROR_MESSAGES.INVALID_MAXIMUM_AMOUNT);
  }
  if (isUnderAmountUnit(amount)) {
    throw new Error(ERROR_MESSAGES.INVALID_AMOUNT_UNIT);
  }
};

export const verifyWinningNumbers = (numbers) => {
  if (hasOverRangeWinningNumber(numbers)) {
    throw new Error(ERROR_MESSAGES.INVALID_LOTTO_RANGE);
  }
  if (hasDuplicatedNumber(numbers)) {
    throw new Error(ERROR_MESSAGES.DUPLICATED_LOTTO_NUMBER);
  }
};
