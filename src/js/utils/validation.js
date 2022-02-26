import { ERROR_MESSAGES } from "./constants.js";
import { isValidAmountUnit, isValidMinimumAmount } from "./general.js";

export const validatePurchaseAmount = (amount) => {
  if (isValidMinimumAmount(amount)) {
    throw new Error(ERROR_MESSAGES.INVALID_MINIMUM_AMOUNT);
  }

  if (isValidAmountUnit(amount)) {
    throw new Error(ERROR_MESSAGES.INVALID_AMOUNT_UNIT);
  }
};
