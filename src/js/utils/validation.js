import { ERROR_MESSAGES, AMOUNT } from "./constants.js";
import { isNotThousandUnit, isUnderMinimum, isOverlap } from "./general.js";

export const validatePurchaseAmount = (amount) => {
  if (isUnderMinimum(amount, AMOUNT.MINIMUM)) {
    throw new Error(ERROR_MESSAGES.MINIMUM_AMOUNT_IS_SMALL);
  }
  if (isNotThousandUnit(amount, AMOUNT.UNIT)) {
    throw new Error(ERROR_MESSAGES.NOT_DIVIDED_INTO_THOUSAND);
  }
};

export const validateWinningNumbers = (numbers) => {
  if (isOverlap(numbers)) {
    throw new Error(ERROR_MESSAGES.CAN_NOT_OVERLAP);
  }
};
