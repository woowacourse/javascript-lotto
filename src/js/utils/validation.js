import { MINIMUM_AMOUNT, AMOUNT_UNIT } from "./constants.js";

export const isValidMinimumAmount = (amount) => {
  return amount >= MINIMUM_AMOUNT;
};

export const isValidAmountUnit = (amount) => {
  return amount % AMOUNT_UNIT === 0;
};
