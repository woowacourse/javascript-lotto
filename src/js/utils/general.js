import { AMOUNT } from "./constants.js";

export const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const isValidMinimumAmount = (amount) => {
  return amount < AMOUNT.MINIMUM;
};

export const isValidAmountUnit = (amount) => {
  return amount % AMOUNT.UNIT !== 0;
};
