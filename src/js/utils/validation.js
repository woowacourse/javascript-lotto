import { ERROR_MESSAGES } from "./constants.js";
import { isValidAmountUnit, isValidMinimumAmount, isValidTypeNumber } from "./general.js";

export const validatePurchaseAmount = (amount) => {
  if (isValidMinimumAmount(amount)) {
    throw new Error(ERROR_MESSAGES.MINIMUM_AMOUNT_IS_SMALL);
  }

  if (isValidAmountUnit(amount)) {
    throw new Error(ERROR_MESSAGES.NOT_DIVIDED_INTO_THOUSAND);
  }
};

export const validateWinningNumber = (number) => {
  if (isValidTypeNumber(number)) {
    throw new Error("숫자가 아님");
  }
};
