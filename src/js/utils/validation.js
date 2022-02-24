import { AMOUNT } from "./constants.js";

export const isValidMinimumAmount = (amount) => {
  return amount >= AMOUNT.MINIMUM;
};

export const isValidAmountUnit = (amount) => {
  return amount % AMOUNT.UNIT === 0;
};
