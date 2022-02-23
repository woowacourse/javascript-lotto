import EXCEPTION from '../constants/exception.js';
import LOTTO from '../constants/lotto.js';

const moneyValidator = {
  isOverMinimum(money) {
    return money >= LOTTO.PRICE_PER_TICKET;
  },

  isUnderMaximum(money) {
    return money <= LOTTO.INVENTORY * LOTTO.PRICE_PER_TICKET;
  },

  isThousandUnit(money) {
    return money % LOTTO.PRICE_PER_TICKET === 0;
  },
};

const validateMoney = (money) => {
  if (!moneyValidator.isOverMinimum(money)) {
    throw new Error(EXCEPTION.INVALID_RANGE.MINIMUM);
  }

  if (!moneyValidator.isUnderMaximum(money)) {
    throw new Error(EXCEPTION.INVALID_RANGE.MAXIMUM);
  }

  if (!moneyValidator.isThousandUnit(money)) {
    throw new Error(EXCEPTION.INVALID_UNIT);
  }
};

export default validateMoney;
