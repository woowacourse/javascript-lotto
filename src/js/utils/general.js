import { AMOUNT } from "./constants.js";

export const shuffleArray = (array) => {
  array.sort(() => Math.random() - 0.5);
};

export const isValidMinimumAmount = (amount) => {
  return amount < AMOUNT.MINIMUM;
};

export const isValidAmountUnit = (amount) => {
  return amount % AMOUNT.UNIT !== 0;
};

export const isValidTypeNumber = (number) => {
  // eslint-disable-next-line no-restricted-globals
  return isNaN(number);
};
