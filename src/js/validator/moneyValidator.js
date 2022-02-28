import EXCEPTION from '../constants/exception.js';
import LOTTO from '../constants/lotto.js';

const moneyValidator = {
  isOverMinimum(money, min) {
    return money >= min;
  },

  isUnderMaximum(money, stock, pricePerTicket) {
    return money <= stock * pricePerTicket;
  },

  isCorrectUnit(money, pricePerTicket) {
    return money % pricePerTicket === 0;
  },
};

const validateMoney = (money) => {
  if (!moneyValidator.isOverMinimum(money, LOTTO.PRICE_PER_TICKET)) {
    throw new Error(EXCEPTION.INVALID_RANGE.MINIMUM);
  }

  if (!moneyValidator.isUnderMaximum(money, LOTTO.INVENTORY, LOTTO.PRICE_PER_TICKET)) {
    throw new Error(EXCEPTION.INVALID_RANGE.MAXIMUM);
  }

  if (!moneyValidator.isCorrectUnit(money, LOTTO.PRICE_PER_TICKET)) {
    throw new Error(EXCEPTION.INVALID_UNIT);
  }
};

export default validateMoney;
