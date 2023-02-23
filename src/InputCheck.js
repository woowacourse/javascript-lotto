import ERROR_MESSAGE from "./constants/ErrorMessage";
import Validators from "./Validators";

const InputCheck = {
  validateBuyMoney(buyMoney, isWeb) {
    if (!Validators.isNumber(buyMoney)) {
      isWeb
        ? this.alertError(ERROR_MESSAGE.INPUT_NUMBER)
        : this.throwError(ERROR_MESSAGE.INPUT_NUMBER);
    }
    if (!Validators.isDevidedByThousand(buyMoney, isWeb)) {
      isWeb
        ? this.alertError(ERROR_MESSAGE.INPUT_NUMBER_DEVIDED_BY_THOUSAND)
        : this.throwError(ERROR_MESSAGE.INPUT_NUMBER_DEVIDED_BY_THOUSAND);
    }
    if (!Validators.isPositiveInteger(buyMoney, isWeb)) {
      isWeb
        ? this.alertError(ERROR_MESSAGE.INPUT_POSITIVE_INTEGER_MONEY)
        : this.throwError(ERROR_MESSAGE.INPUT_POSITIVE_INTEGER_MONEY);
    }
  },

  validateWinningNumbers(winningLotto, isWeb) {
    if (Validators.isDuplicatedNumbers(winningLotto, isWeb)) {
      isWeb
        ? this.alertError(ERROR_MESSAGE.INPUT_NOT_DUPLICATED_EACH_NUMBER)
        : this.throwError(ERROR_MESSAGE.INPUT_NOT_DUPLICATED_EACH_NUMBER);
    }
    if (!Validators.isCorrectLength(winningLotto, isWeb)) {
      isWeb
        ? this.alertError(ERROR_MESSAGE.INPUT_SIX_NUMBERS)
        : this.throwError(ERROR_MESSAGE.INPUT_SIX_NUMBERS);
    }
    for (let i = 0; i < winningLotto.length; i++) {
      this.checkNumber(winningLotto[i], isWeb);
    }
  },

  checkNumber(eachNumber, isWeb) {
    if (!Validators.isNumber(eachNumber, isWeb)) {
      isWeb
        ? this.alertError(ERROR_MESSAGE.INPUT_NUMBER)
        : this.throwError(ERROR_MESSAGE.INPUT_NUMBER);
    }
    if (!Validators.isCorrectRange(eachNumber, isWeb)) {
      isWeb
        ? this.alertError(ERROR_MESSAGE.INPUT_CORRECT_RANGE_NUMBER)
        : this.throwError(ERROR_MESSAGE.INPUT_CORRECT_RANGE_NUMBER);
    }
    if (!Validators.isPositiveInteger(eachNumber, isWeb)) {
      isWeb
        ? this.alertError(ERROR_MESSAGE.INPUT_POSITIVE_INTEGER_LOTTO)
        : this.throwError(ERROR_MESSAGE.INPUT_POSITIVE_INTEGER_LOTTO);
    }
  },

  validateBonusNumber(bonusNumber, winningLotto, isWeb) {
    if (Validators.hasBonusNumber(bonusNumber, winningLotto, isWeb)) {
      isWeb
        ? this.alertError(ERROR_MESSAGE.INPUT_NOT_DUPLICATED_NUMBER)
        : this.throwError(ERROR_MESSAGE.INPUT_NOT_DUPLICATED_NUMBER);
    }
    this.checkNumber(bonusNumber, isWeb);
  },

  validateRetryInput(retryInput, isWeb) {
    if (!Validators.isString(retryInput, isWeb)) {
      isWeb
        ? this.alertError(ERROR_MESSAGE.INPUT_STRING)
        : this.throwError(ERROR_MESSAGE.INPUT_STRING);
    }
    if (!Validators.isCorrectRetryInput(retryInput, isWeb)) {
      isWeb
        ? this.alertError(ERROR_MESSAGE.INPUT_CORRECT_RETRY)
        : this.throwError(ERROR_MESSAGE.INPUT_CORRECT_RETRY);
    }
  },

  throwError(errorMessage) {
    throw new Error(errorMessage);
  },

  alertError(errorMessage) {
    alert(errorMessage);
    throw Error(errorMessage);
  },
};

export default InputCheck;
