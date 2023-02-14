import { ErrorMessage, StaticValue } from '../constants/Constants';

const Validation = {
  checkPurchaseAmount(money) {
    this.checkPurchaseAmountUnit(money);
  },

  checkPurchaseAmountUnit(money) {
    if (money % StaticValue.PURCHASE_AMOUNT_UNIT !== 0) {
      throw new Error(ErrorMessage.PURCHASE_AMOUNT_UNIT);
    }
  }
};

export default Validation;