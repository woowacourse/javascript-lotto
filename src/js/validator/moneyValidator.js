import EXCEPTION from '../constants/exception.js';
import LOTTO from '../constants/lotto.js';

const moneyValidator = {
  isCorrectRange(money) {
    return money >= LOTTO.PRICE_PER_TICKET;
  },

  isThousandUnit(money) {
    return money % LOTTO.PRICE_PER_TICKET === 0;
  },
};

const validateMoney = (money) => {
  if (!moneyValidator.isCorrectRange(money)) {
    throw new Error(EXCEPTION.INVALID_RANGE);
  }

  if (!moneyValidator.isThousandUnit(money)) {
    throw new Error(EXCEPTION.INVALID_UNIT);
  }
};

export default validateMoney;
