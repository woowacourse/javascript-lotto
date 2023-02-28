import { NUMBER } from '../utils/constant.js';

export const thousandValidate = money => {
  const isValidation = money % NUMBER.PURCHASE_AMOUNT !== 0;
  if (isValidation) return true;
  return isValidation;
};

export const maximumMoneyValidate = money => {
  const isValidation = money > NUMBER.MAXIMUM_PURCHASE_AMOUNT;
  if (isValidation) return true;
  return isValidation;
};

export const winningIncludeBonusNumber = (numbers, bonus) => {
  const isValidation = numbers.includes(bonus);
  if (isValidation) return true;
  return isValidation;
};
