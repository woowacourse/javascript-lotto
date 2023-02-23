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
    return true;
  }

  if (maximumMoneyValidate(money)) {
    return true;
  }

  if (thousandValidate(money)) {
    return true;
  }
};

const winningNumberCountValidate = numbers => {
  return numbers.length === NUMBER.MAX_LENGHT;
};

const winningNumberRange = numbers => {
  return numbers.every(number => number >= NUMBER.MIN_NUMBER && number <= NUMBER.MAX_NUMBER);
};

const winningAndBonusNumberValidate = (numbers, bonus) => {
  if (!winningNumberRange(numbers)) {
    return true;
  }
  if (!winningNumberCountValidate(numbers)) {
    return true;
  }
  if (!(bonus >= NUMBER.MIN_NUMBER && bonus <= NUMBER.MAX_NUMBER)) {
    return true;
  }
  if (numbers.includes(bonus)) return true;
};

const bonusNumberValidate = number => {
  if (!(number >= NUMBER.MIN_NUMBER && number <= NUMBER.MAX_NUMBER)) {
    return true;
  }
};

const winningIncludeBonusNumberValidate = (numbers, bonus) => {
  return numbers.includes(bonus);
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
  winningIncludeBonusNumberValidate,
  restartValidate,
  winningAndBonusNumberValidate,
  bonusNumberValidate,
  thousandValidate,
  integerValidate,
  maximumMoneyValidate,
  winningNumberCountValidate,
  winningNumberRange,
  winningIncludeBonusNumberValidate
};
