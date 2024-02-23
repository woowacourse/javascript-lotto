import Message from '../constants/Message';
import Condition from '../constants/Condition';

const { MONEY } = Condition;
const { ERROR } = Message;

const MoneyValidator = {
  validateType(money) {
    if (Number.isNaN(Number(money))) {
      throw new Error(ERROR.MONEY_TYPE);
    }
  },

  validateRange(money) {
    if (money <= MONEY.MIN || money > MONEY.MAX) {
      throw new Error(ERROR.MONEY_RANGE);
    }
  },

  validateUnit(money) {
    if (money % MONEY.UNIT !== 0) {
      throw new Error(ERROR.MONEY_UNIT);
    }
  },
};

export default MoneyValidator;
