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
  if (integerValidate(money)) throw new Error(ERROR.INPUT_MONEY_INTEGER);

  if (maximumMoneyValidate(money)) throw new Error(ERROR.INPUT_MONEY_LIMIT);

  if (thousandValidate(money)) throw new Error(ERROR.INPUT_MONEY_THOUSAND);
};

const winningNumberCountValidate = numbers => {
  return numbers.length === NUMBER.MAX_LENGHT;
};

const winningNumberRange = numbers => {
  return numbers.every(number => number >= NUMBER.MIN_NUMBER && number <= NUMBER.MAX_NUMBER);
};

const winningAndBonusNumberValidate = (numbers, bonus) => {
  if (!winningNumberRange(numbers)) throw new Error(ERROR.WINNING_NUMBER_RANGE);

  if (!winningNumberCountValidate(numbers)) throw new Error(ERROR.WINNING_NUMBER_COUNT);

  if (bonusNumberValidate(bonus)) throw new Error(ERROR.BONUS_NUMBER_RANGE);

  if (winningIncludeBonusNumberValidate(numbers, bonus)) throw new Error(ERROR.BONUS_WINNING_NUMBER_DUPLICATION);
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
