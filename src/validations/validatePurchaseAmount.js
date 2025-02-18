import { PURCHASE_AMOUNT_ERROR_MESSAGES } from "../constants/constants.js";

const validatePurchaseAmount = (input) => {
  const purchaseAmount = Number(input);

  if (Number.isNaN(purchaseAmount)) {
    throw new Error(PURCHASE_AMOUNT_ERROR_MESSAGES.NOT_A_NUMBER);
  }
  if (purchaseAmount < 1_000) {
    throw new Error(PURCHASE_AMOUNT_ERROR_MESSAGES.BELOW_MINIMUM);
  }
  if (purchaseAmount % 1_000 !== 0) {
    throw new Error(PURCHASE_AMOUNT_ERROR_MESSAGES.INVALID_UNIT);
  }
  if (purchaseAmount > 100_000) {
    throw new Error(PURCHASE_AMOUNT_ERROR_MESSAGES.ABOVE_MAXIMUM);
  }
  return purchaseAmount;
};

export default validatePurchaseAmount;
