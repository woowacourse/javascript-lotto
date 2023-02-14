import { StaticValue, ErrorMessage } from "../constants/Constants";

const Validation = {
  checkPurchaseAmount(money) {
    this.checkMoneyMinmumValue(money);
    this.checkMoneyUnit(money);
    this.checkMoneyInputType(money);
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

  checkMoneyInputType(money) {
    if (StaticValue.REGEX_NON_DIGIT.test(money)) {
      throw new Error(ErrorMessage.MONEY_INPUT_TYPE);
    }
  }
};

export default Validation;
