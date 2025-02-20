import {
  validateIsNumeric,
  validateMaximumValue,
  validateMinimumValue,
  validatePurchaseUnit,
} from "./validate.js";

const priceValidateList = [
  validateIsNumeric,
  validateMinimumValue,
  validatePurchaseUnit,
  validateMaximumValue,
];

export const validatePrice = (price) => {
  priceValidateList.forEach((validate) => {
    validate(price);
  });
};
