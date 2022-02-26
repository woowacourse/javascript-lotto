import { AMOUNT } from "./constants.js";

export const shuffle = (array) => {
  array.sort(() => Math.random() - 0.5);
};

export const isValidMinimumAmount = (amount) => {
  return amount < AMOUNT.MINIMUM;
};

export const isValidAmountUnit = (amount) => {
  return amount % AMOUNT.UNIT !== 0;
};
