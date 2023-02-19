const { ERROR } = require('../utils/constant.js');

const thousandValidate = money => {
  const isValidation = Number(money) % 1000 !== 0;
  if (!isValidation) console.log(ERROR.INPUT_MONEY_THOUSAND);
  return isValidation;
};

const integerValidate = money => {
  const isValidation = !(isNaN(money) || money <= 0);
  if (!isValidation) console.log(ERROR.INPUT_MONEY_INTEGER);
  return isValidation;
};

const maximumMoneyValidate = money => {
  const isValidation = money > 100000;
  if (!isValidation) console.log(ERROR.INPUT_MONEY_LIMIT);
  return isValidation;
};

const winningIncludeBonusNumber = (numbers, bonus) => {
  const isValidation = numbers.includes(bonus);
  if (!isValidation) console.log(ERROR.BONUS_WINNING_NUMBER_DUPLICATION);
  return isValidation;
};

const restartValidate = input => {
  const isValidation = input !== 'y' || input !== 'n';
  if (!isValidation) console.log(ERROR.RESTART_OR_FINISH);
  return isValidation;
};

module.exports = {
  thousandValidate,
  integerValidate,
  maximumMoneyValidate,
  winningIncludeBonusNumber,
  restartValidate,
};
