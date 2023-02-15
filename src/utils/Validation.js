import { StaticValue, ErrorMessage } from "../constants/Constants.js";

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
  },

  checkLottoNumber(lotto) {
    this.checkLottoNumberLength(lotto);
    this.checkLottoNumberRange(lotto);
    this.checkLottoDuplicate(lotto);
    this.checkLottoNumbersType(lotto);
  },

  checkLottoNumberLength(lotto) {
    if (lotto.length !== 6) {
      throw new Error(ErrorMessage.LOTTO_LENGTH);
    }
  },

  checkLottoNumberRange(lotto) {
    lotto.forEach((number) => {
      if (number < 1 || number > 45) {
        throw new Error(ErrorMessage.LOTTO_VALUE);
      }
    });
  },

  checkLottoDuplicate(lotto) {
    if (lotto.length !== new Set(lotto).size) {
      throw new Error(ErrorMessage.LOTTO_DUPLICATE);
    }
  },

  checkLottoNumbersType(lotto) {
    lotto.forEach((number) => {
      if (isNaN(number)) {
        throw new Error(ErrorMessage.LOTTO_VALUE);
      }
    })
  },
};

export default Validation;
