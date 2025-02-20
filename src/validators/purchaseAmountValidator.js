import CustomError from "../CustomError.js";
import { MESSAGES, SETTINGS } from "../constants/index.js";

export const purchaseAmountValidator = (inputValue) => {
  validateInteger(inputValue);
  validateAboveMinRange(inputValue);
  validateUnit(inputValue);
};

const validateInteger = (inputValue) => {
  if (isNaN(inputValue)) {
    throw new CustomError(MESSAGES.invalid.numberFormat);
  }

  if (!Number.isInteger(inputValue)) {
    throw new CustomError(MESSAGES.invalid.decimalNumber);
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
