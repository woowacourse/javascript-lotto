import ERROR_MESSAGE from "./constants/ErrorMessage";
import validators from "./Validators";

const InputCheck = {
  validateBuyMoney(buyMoney, isWeb) {
    if (!validators.isNumber(buyMoney)) {
      this.throwError(ERROR_MESSAGE.INPUT_NUMBER, isWeb);
    }
    if (!validators.isDevidedByThousand(buyMoney, isWeb)) {
      this.throwError(ERROR_MESSAGE.INPUT_NUMBER, isWeb);
    }
    if (!validators.isPositiveInteger(buyMoney, isWeb)) {
      this.throwError(ERROR_MESSAGE.INPUT_NUMBER, isWeb);
    }
  },

  validateWinningNumbers(winningLotto, isWeb) {
    if (validators.isDuplicatedNumbers(winningLotto, isWeb)) {
      this.throwError(ERROR_MESSAGE.INPUT_NUMBER, isWeb);
    }
    if (!validators.isCorrectLength(winningLotto, isWeb)) {
      this.throwError(ERROR_MESSAGE.INPUT_NUMBER, isWeb);
    }
    for (let i = 0; i < winningLotto.length; i++) {
      this.checkNumber(winningLotto[i], isWeb);
    }
  },

  checkNumber(eachNumber, isWeb) {
    if (!validators.isNumber(eachNumber, isWeb)) {
      this.throwError(ERROR_MESSAGE.INPUT_NUMBER, isWeb);
    }
    if (!validators.isCorrectRange(eachNumber, isWeb)) {
      this.throwError(ERROR_MESSAGE.INPUT_NUMBER, isWeb);
    }
    if (!validators.isPositiveInteger(eachNumber, isWeb)) {
      this.throwError(ERROR_MESSAGE.INPUT_NUMBER, isWeb);
    }
  },

  validateBonusNumber(bonusNumber, winningLotto, isWeb) {
    if (validators.hasBonusNumber(bonusNumber, winningLotto, isWeb)) {
      this.throwError(ERROR_MESSAGE.INPUT_NUMBER, isWeb);
    }
    this.checkNumber(bonusNumber, isWeb);
  },

  validateRetryInput(retryInput, isWeb) {
    if (!validators.isString(retryInput, isWeb)) {
      this.throwError(ERROR_MESSAGE.INPUT_NUMBER, isWeb);
    }
    if (!validators.isCorrectRetryInput(retryInput, isWeb)) {
      this.throwError(ERROR_MESSAGE.INPUT_NUMBER, isWeb);
    }
  },

  throwError(errorMessage, isWeb) {
    if (isWeb) {
      alert(errorMessage);
    }
    throw new Error(errorMessage);
  },
};

export default InputCheck;
