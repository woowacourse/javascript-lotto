import { StaticValue, ErrorMessage } from "../constants/Constants";

const Validation = {
  checkPurchaseAmount(money) {
    this.checkMoneyMinmumValue(money);
    this.checkMoneyUnit(money);
  },

  checkMoneyMinmumValue(money) {
    if (money <= 0) {
      throw new Error(ErrorMessage.MINMUM_VALUE);
    }
  },

  checkMoneyUnit(money) {
    if (money % StaticValue.PURCHASE_AMOUNT_UNIT !== 0) {
      throw new Error(ErrorMessage.MONEY_VALUE);
    }
  },
};

export default Validation;
