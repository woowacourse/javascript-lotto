import { StaticValue, ErrorMessage } from '../constants/Constants.js';

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
    if (lotto.length !== StaticValue.LOTTO_LENGTH) {
      throw new Error(ErrorMessage.LOTTO_LENGTH);
    }
  },

  checkLottoNumberRange(lotto) {
    lotto.forEach((number) => {
      if (!this.isNumberInRange(number)) {
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
    });
  },

  checkBonusNumber(winningNumbers, bonusNumber) {
    this.checkBounsNumberRange(bonusNumber);
    this.checkBonusNumberDuplicate(winningNumbers, bonusNumber);
  },

  checkBonusNumberDuplicate(winningNumbers, bonusNumber) {
    if (winningNumbers.includes(bonusNumber)) {
      throw new Error(ErrorMessage.BONUS_NUMBER_DUPLICATE);
    }
  },

  checkBounsNumberRange(bonusNumber) {
    if (!this.isNumberInRange(bonusNumber)) {
      throw new Error(ErrorMessage.BONUS_NUMBER_VALUE);
    }
  },

  isNumberInRange(number) {
    return (
      number >= StaticValue.LOTTO_LOWER_INCLUSIVE && number <= StaticValue.LOTTO_UPPER_INCLUSIVE
    );
  },

  checkRestart(reply) {
    if (reply !== StaticValue.RESTART_CONTROL && reply !== StaticValue.QUIT_CONTROL) {
      throw new Error(ErrorMessage.RESTART);
    }
  },
};

export default Validation;
