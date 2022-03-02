import EXCEPTION from '../constants/exception.js';
import LOTTO from '../constants/lotto.js';

export const moneyValidator = {
  isUnderMinimum(money) {
    return money < LOTTO.PRICE_PER_TICKET;
  },

  isOverMaximum(money) {
    return money > LOTTO.INVENTORY * LOTTO.PRICE_PER_TICKET;
  },
};

const validateMoney = (money) => {
  if (moneyValidator.isUnderMinimum(money)) {
    throw new Error(EXCEPTION.INVALID_RANGE.MINIMUM);
  }

  if (moneyValidator.isOverMaximum(money)) {
    throw new Error(EXCEPTION.INVALID_RANGE.MAXIMUM);
  }
  return true;
};

export default validateMoney;
