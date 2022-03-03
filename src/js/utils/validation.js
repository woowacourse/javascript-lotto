import { ERROR_MESSAGES, AMOUNT, LOTTO_NUMBER } from "./constants.js";
import {
  isValidAmountUnit,
  isValidMinimumAmount,
  isValidTypeNumber,
  isValidEmptyValue,
  isValidNumberRange,
  isValidOverlap,
} from "./general.js";

export const validatePurchaseAmount = (amount) => {
  if (isValidMinimumAmount(amount, AMOUNT.MINIMUM)) {
    throw new Error(ERROR_MESSAGES.MINIMUM_AMOUNT_IS_SMALL);
  }
  if (isValidAmountUnit(amount, AMOUNT.UNIT)) {
    throw new Error(ERROR_MESSAGES.NOT_DIVIDED_INTO_THOUSAND);
  }
};

export const validateWinningNumbers = (numbers) => {
  if (numbers.some((number) => isValidTypeNumber(number))) {
    throw new Error(ERROR_MESSAGES.NOT_A_NUMBER);
  }
  if (numbers.some((number) => isValidEmptyValue(number))) {
    throw new Error(ERROR_MESSAGES.EMPTY_CAN_NOT_ENTERED);
  }
  if (
    numbers.some((number) =>
      isValidNumberRange(number, LOTTO_NUMBER.RANGE_MIN, LOTTO_NUMBER.RANGE_MAX),
    )
  ) {
    throw new Error(ERROR_MESSAGES.OUT_OF_RANGE);
  }
  if (isValidOverlap(numbers)) {
    throw new Error(ERROR_MESSAGES.CAN_NOT_OVERLAP);
  }
};
