import { ERROR_MESSAGES, AMOUNT, LOTTO_NUMBER } from "./constants.js";
import {
  isNotThousandUnit,
  isUnderMinimum,
  isNotNumber,
  isEmpty,
  isOutOfRange,
  isOverlap,
} from "./general.js";

export const validatePurchaseAmount = (amount) => {
  if (isUnderMinimum(amount, AMOUNT.MINIMUM)) {
    throw new Error(ERROR_MESSAGES.MINIMUM_AMOUNT_IS_SMALL);
  }
  if (isNotThousandUnit(amount, AMOUNT.UNIT)) {
    throw new Error(ERROR_MESSAGES.NOT_DIVIDED_INTO_THOUSAND);
  }
};

export const validateWinningNumbers = (numbers) => {
  if (numbers.some((number) => isNotNumber(number))) {
    throw new Error(ERROR_MESSAGES.NOT_A_NUMBER);
  }
  if (numbers.some((number) => isEmpty(number))) {
    throw new Error(ERROR_MESSAGES.EMPTY_CAN_NOT_ENTERED);
  }
  if (
    numbers.some((number) => isOutOfRange(number, LOTTO_NUMBER.RANGE_MIN, LOTTO_NUMBER.RANGE_MAX))
  ) {
    throw new Error(ERROR_MESSAGES.OUT_OF_RANGE);
  }
  if (isOverlap(numbers)) {
    throw new Error(ERROR_MESSAGES.CAN_NOT_OVERLAP);
  }
};
