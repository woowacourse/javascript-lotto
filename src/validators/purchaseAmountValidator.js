import CustomError from "../CustomError.js";
import { MESSAGES, SETTINGS } from "../constants/index.js";

export const purchaseAmountValidator = (inputValue) => {
  const purchaseAmount = parseInt(inputValue, 10);
  validateInteger(purchaseAmount);
  validateAboveMinRange(purchaseAmount);
  validateUnit(purchaseAmount);
};

const validateInteger = (inputValue) => {
  if (!Number.isInteger(inputValue)) {
    throw new CustomError(MESSAGES.invalid.numberFormat);
  }
};

const validateAboveMinRange = (inputValue) => {
  if (inputValue < SETTINGS.priceUnit) {
    throw new CustomError(MESSAGES.invalid.minimumPurchase);
  }
};

const validateUnit = (inputValue) => {
  if (inputValue % SETTINGS.priceUnit !== 0) {
    throw new CustomError(MESSAGES.invalid.purchaseAmount);
  }
};

export default purchaseAmountValidator;
