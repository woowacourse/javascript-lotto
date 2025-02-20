import {
  MAX_AMOUNT,
  MIN_UNIT,
  PURCHASE_AMOUNT_ERROR_MESSAGES,
} from "../constants/constants.js";

const validatePurchaseAmount = (input) => {
  const purchaseAmount = Number(input);

  if (Number.isNaN(purchaseAmount)) {
    throw new Error(PURCHASE_AMOUNT_ERROR_MESSAGES.NOT_A_NUMBER);
  }
  if (purchaseAmount < MIN_UNIT) {
    throw new Error(PURCHASE_AMOUNT_ERROR_MESSAGES.BELOW_MINIMUM);
  }
  if (purchaseAmount % MIN_UNIT !== 0) {
    throw new Error(PURCHASE_AMOUNT_ERROR_MESSAGES.INVALID_UNIT);
  }
  if (purchaseAmount > MAX_AMOUNT) {
    throw new Error(PURCHASE_AMOUNT_ERROR_MESSAGES.ABOVE_MAXIMUM);
  }
  return purchaseAmount;
};

export default validatePurchaseAmount;
