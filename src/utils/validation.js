const { ERROR, NUMBER, RESPONSE } = require('../utils/constant.js');

const thousandValidate = money => {
  return Number(money) % 1000 !== 0;
};

const integerValidate = money => {
  return isNaN(money) || money <= 0;
};

const maximumMoneyValidate = money => {
  return money > 100000;
};

const moneyValidate = money => {
  if (integerValidate(money)) {
    console.log(ERROR.INPUT_MONEY_INTEGER);
    return true;
  }

  if (maximumMoneyValidate(money)) {
    console.log(ERROR.INPUT_MONEY_LIMIT);
    return true;
  }

  if (thousandValidate(money)) {
    console.log(ERROR.INPUT_MONEY_THOUSAND);
    return true;
  }
};

const winningNumberCount = numbers => {
  return numbers.split(',').length === NUMBER.MAX_LENGHT;
};

const winningNumberRange = numbers => {
  return numbers.split(',').every(number => number >= NUMBER.MIN_NUMBER && number <= NUMBER.MAX_NUMBER);
};

const winningNumberValidate = numbers => {
  if (!winningNumberRange(numbers)) {
    console.log(ERROR.WINNING_NUMBER_RANGE);
    return true;
  }
  if (!winningNumberCount(numbers)) {
    console.log(ERROR.WINNING_NUMBER_COUNT);
    return true;
  }
};

const bonusNumberValidate = number => {
  if (!(number >= NUMBER.MIN_NUMBER && number <= NUMBER.MAX_NUMBER)) {
    console.log(ERROR.BONUS_NUMBER_RANGE);
    return true;
  }
};

const winningIncludeBonusNumber = (numbers, bonus) => {
  const isValidation = numbers.includes(bonus);
  if (isValidation) console.log(ERROR.BONUS_WINNING_NUMBER_DUPLICATION);
  return isValidation;
};

const restartValidate = response => {
  if (response !== RESPONSE.YES && response !== RESPONSE.NO) {
    console.log(ERROR.RESTART_OR_FINISH);
    return true;
  }
  return false;
};

module.exports = {
  moneyValidate,
  winningIncludeBonusNumber,
  restartValidate,
  winningNumberValidate,
  bonusNumberValidate,
};
