const {
  bonusNumberValidate,
  thousandValidate,
  integerValidate,
  maximumMoneyValidate,
  winningNumberCountValidate,
  winningNumberRange,
  winningIncludeBonusNumberValidate
} = require('../utils/validation.js');
const { ERROR } = require('../utils/constant.js');

const moneyValidateError = money => {
  try {
    if (thousandValidate(money)) throw new Error(ERROR.INPUT_MONEY_THOUSAND);

    if (integerValidate(money)) throw new Error(ERROR.INPUT_MONEY_INTEGER);

    if (maximumMoneyValidate(money)) throw new Error(ERROR.INPUT_MONEY_LIMIT);
  } catch (error) {
    return error.message;
  }
};

const winningAndBonusNumberValidateError = (numbers, bonus) => {
  try {
    if (!winningNumberCountValidate(numbers)) throw new Error(ERROR.WINNING_NUMBER_COUNT);

    if (!winningNumberRange(numbers)) throw new Error(ERROR.WINNING_NUMBER_RANGE);

    if (bonusNumberValidate(bonus)) throw new Error(ERROR.BONUS_NUMBER_RANGE);

    if (winningIncludeBonusNumberValidate(numbers, bonus)) throw new Error(ERROR.BONUS_WINNING_NUMBER_DUPLICATION);

  } catch (error) {
    return error.message;
  }
};


module.exports = {
  moneyValidateError,
  winningAndBonusNumberValidateError,
};
