import Error from "./constants/Error";
import Validations from "./Validations";

const InputCheck = {
  validateBuyMoney(buyMoney) {
    if (!Validations.isNumber(buyMoney)) {
      throw new Error(Error.INPUT_NUMBER);
    }
    if (!Validations.isDevidedByThousand(buyMoney)) {
      throw new Error(Error.INPUT_NUMBER_DEVIDED_BY_THOUSAND);
    }
    if (!Validations.isPositiveInteger(buyMoney)) {
      throw new Error(Error.INPUT_POSITIVE_INTEGER_MONEY);
    }
  },

  validateWinningNumbers(winningLotto) {
    if (!Validations.isCorrectLength(winningLotto)) {
      throw new Error(Error.INPUT_SIX_NUMBERS);
    }
    for (let i = 0; i < winningLotto.length; i++) {
      this.checkEachNumber(winningLotto[i]);
    }
  },

  checkEachNumber(eachNumber) {
    if (!Validations.isNumber(eachNumber)) {
      throw new Error(Error.INPUT_NUMBER);
    }
    if (!Validations.isCorrectRange(eachNumber)) {
      throw new Error(Error.INPUT_CORRECT_RANGE_NUMBER);
    }
    if (!Validations.isPositiveInteger(eachNumber)) {
      throw new Error(Error.INPUT_POSITIVE_INTEGER_LOTTO);
    }
  },

  validateBonusNumber(bonusNumber, winningLotto) {
    console.log(winningLotto);
    if (Validations.hasBonusNumber(bonusNumber, winningLotto)) {
      throw new Error(Error.INPUT_NOT_DUPLICATED_NUMBER);
    }
  },

  validateRetryInput(retryInput) {
    if (!Validations.isString(retryInput)) {
      throw new Error("문자열을 입력해주세요.");
    }
    if (!Validations.isCorrectRetryInput(retryInput)) {
      throw new Error(Error.INPUT_CORRECT_RETRY);
    }
  },
};

export default InputCheck;
