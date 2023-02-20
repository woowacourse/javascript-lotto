import ERROR_MESSAGE from "./constants/ErrorMessage";
import Validators from "./Validators";

const InputCheck = {
  validateBuyMoney(buyMoney) {
    if (!Validators.isNumber(buyMoney)) {
      throw new Error(ERROR_MESSAGE.INPUT_NUMBER);
    }
    if (!Validators.isDevidedByThousand(buyMoney)) {
      throw new Error(ERROR_MESSAGE.INPUT_NUMBER_DEVIDED_BY_THOUSAND);
    }
    if (!Validators.isPositiveInteger(buyMoney)) {
      throw new Error(ERROR_MESSAGE.INPUT_POSITIVE_INTEGER_MONEY);
    }
  },

  validateWinningNumbers(winningLotto) {
    if (!Validators.isCorrectLength(winningLotto)) {
      throw new Error(ERROR_MESSAGE.INPUT_SIX_NUMBERS);
    }
    for (let i = 0; i < winningLotto.length; i++) {
      this.checkNumber(winningLotto[i]);
    }
  },

  checkNumber(eachNumber) {
    if (!Validators.isNumber(eachNumber)) {
      throw new Error(ERROR_MESSAGE.INPUT_NUMBER);
    }
    if (!Validators.isCorrectRange(eachNumber)) {
      throw new Error(ERROR_MESSAGE.INPUT_CORRECT_RANGE_NUMBER);
    }
    if (!Validators.isPositiveInteger(eachNumber)) {
      throw new Error(ERROR_MESSAGE.INPUT_POSITIVE_INTEGER_LOTTO);
    }
  },

  validateBonusNumber(bonusNumber, winningLotto) {
    if (Validators.hasBonusNumber(bonusNumber, winningLotto)) {
      throw new Error(ERROR_MESSAGE.INPUT_NOT_DUPLICATED_NUMBER);
    }
  },

  validateRetryInput(retryInput) {
    if (!Validators.isString(retryInput)) {
      throw new Error(ERROR_MESSAGE.INPUT_STRING);
    }
    if (!Validators.isCorrectRetryInput(retryInput)) {
      throw new Error(ERROR_MESSAGE.INPUT_CORRECT_RETRY);
    }
  },
};

export default InputCheck;
