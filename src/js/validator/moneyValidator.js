import EXCEPTION from '../constants/exception.js';
import LOTTO from '../constants/lotto.js';

const moneyValidator = {
  isOverMinimum(money) {
    return money >= LOTTO.PRICE_PER_TICKET;
  },

  isUnderMaximum(money) {
    return money <= LOTTO.INVENTORY * LOTTO.PRICE_PER_TICKET;
  },
};

const validateMoney = (money) => {
  if (!moneyValidator.isOverMinimum(money)) {
    throw new Error(EXCEPTION.INVALID_RANGE.MINIMUM);
  }

  if (!moneyValidator.isUnderMaximum(money)) {
    throw new Error(EXCEPTION.INVALID_RANGE.MAXIMUM);
  }
  return true;
};

export default validateMoney;
