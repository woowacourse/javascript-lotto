import {
  GameControlStaticValue,
  Regex,
  RandomNumberStaticValue,
  ErrorMessage,
} from '../constants/Constants.js';

const Validation = {
  testPurchaseAmount(money) {
    this.checkMoneyMinmumValue(money);
    this.checkMoneyUnit(money);
    this.checkMoneyInputType(money);
    this.checkMoneyLimit(money);
  },

  checkMoneyMinmumValue(money) {
    if (money <= 0) {
      throw new Error(ErrorMessage.MINMUM_VALUE);
    }
  },

  checkMoneyUnit(money) {
    if (money % GameControlStaticValue.PURCHASE_AMOUNT_UNIT !== 0) {
      throw new Error(ErrorMessage.MONEY_VALUE);
    }
  },

  checkMoneyInputType(money) {
    if (Regex.NON_DIGIT.test(money)) {
      throw new Error(ErrorMessage.MONEY_INPUT_TYPE);
    }
  },

  checkMoneyLimit(money) {
    if (money > GameControlStaticValue.PURCHASE_AMOUNT_LIMIT) {
      throw new Error(ErrorMessage.MONEY_LIMIT);
    }
  },

  testLottoNumbers(lotto) {
    this.checkLottoNumbersLength(lotto);
    this.checkLottoNumbersRange(lotto);
    this.checkLottoNumbersDuplicate(lotto);
    this.checkLottoNumbersType(lotto);
  },

  checkLottoNumbersLength(lotto) {
    if (lotto.length !== RandomNumberStaticValue.LENGTH) {
      throw new Error(ErrorMessage.LOTTO_LENGTH);
    }
  },

  checkLottoNumbersRange(lotto) {
    lotto.forEach((number) => {
      if (!this.isNumberInRange(number)) {
        throw new Error(ErrorMessage.LOTTO_VALUE);
      }
    });
  },

  checkLottoNumbersDuplicate(lotto) {
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

  testBonusNumber(winningNumbers, bonusNumber) {
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
      number >= RandomNumberStaticValue.LOWER_INCLUSIVE &&
      number <= RandomNumberStaticValue.UPPER_INCLUSIVE
    );
  },

  testRestart(reply) {
    if (
      reply !== GameControlStaticValue.RESTART_BUTTON &&
      reply !== GameControlStaticValue.QUIT_BUTTON
    ) {
      throw new Error(ErrorMessage.RESTART);
    }
  },
};

export default Validation;
