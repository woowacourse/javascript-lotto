import EXCEPTION from '../constants/exception.js';
import LOTTO from '../constants/lotto.js';

export const moneyValidator = {
  isOverMin(money, min) {
    return money >= min;
  },

  isUnderMax(money, stock, pricePerTicket) {
    return money <= stock * pricePerTicket;
  },

  isCorrectUnit(money, pricePerTicket) {
    return money % pricePerTicket === 0;
  },
};

export const validateMoney = (money) => {
  if (!moneyValidator.isOverMin(money, LOTTO.PRICE_PER_TICKET)) {
    throw new Error(EXCEPTION.INVALID_RANGE.MINIMUM);
  }

  if (
    !moneyValidator.isUnderMax(money, LOTTO.INVENTORY, LOTTO.PRICE_PER_TICKET)
  ) {
    throw new Error(EXCEPTION.INVALID_RANGE.MAXIMUM);
  }

  if (!moneyValidator.isCorrectUnit(money, LOTTO.PRICE_PER_TICKET)) {
    throw new Error(EXCEPTION.INVALID_UNIT);
  }
};
