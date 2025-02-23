import CustomError from "../CustomError.js";
import { MESSAGES, SETTINGS } from "../constants/index.js";

export const purchaseAmountValidator = (inputValue) => {
  validateInteger(inputValue);
  validatePriceRange(inputValue);
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

const validatePriceRange = (inputValue) => {
  if (inputValue < SETTINGS.priceUnit) {
    throw new CustomError(MESSAGES.invalid.minimumPurchase);
  }

  if (inputValue > SETTINGS.maxPriceLimit) {
    throw new CustomError(MESSAGES.invalid.maximumPurchase);
  }
};

const validateUnit = (inputValue) => {
  if (inputValue % SETTINGS.priceUnit !== 0) {
    throw new CustomError(MESSAGES.invalid.purchaseAmount);
  }
};

export default purchaseAmountValidator;
