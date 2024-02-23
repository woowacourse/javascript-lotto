import ERROR from '../../constants/ErrorMessage';
import Condition from '../../constants/Condition';

const { MONEY } = Condition;

const Money = {
  validateMoneyType(money) {
    if (Number.isNaN(Number(money))) {
      throw new Error(ERROR.MONEY_TYPE);
    }
  },

  validateMoneyMinimum(money) {
    if (money <= MONEY.MIN) {
      throw new Error(ERROR.MONEY_MINIMUM);
    }
  },

  validateMoneyUnit(money) {
    if (money % MONEY.UNIT !== 0) {
      throw new Error(ERROR.MONEY_UNIT);
    }
  },
};

export default Money;
