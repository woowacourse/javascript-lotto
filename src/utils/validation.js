const { NUMBER } = require('../utils/constant');

const thousandValidate = money => {
  const isValidation = money % NUMBER.PURCHASE_AMOUNT !== 0;
  if (isValidation) return true;
  return isValidation;
};

const maximumMoneyValidate = money => {
  const isValidation = money > NUMBER.MAXIMUM_PURCHASE_AMOUNT;
  if (isValidation) return true;
  return isValidation;
};

const winningIncludeBonusNumber = (numbers, bonus) => {
  const isValidation = numbers.includes(bonus);
  if (isValidation) return true;
  return isValidation;
};

module.exports = {
  thousandValidate,
  maximumMoneyValidate,
  winningIncludeBonusNumber,
};
