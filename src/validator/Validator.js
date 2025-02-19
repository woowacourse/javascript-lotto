import {
  ERROR_MESSAGES,
  LOTTO_PRICE,
  MAX_LOTTO_NUMBER,
  MIN_LOTTO_NUMBER,
} from "../lib/constants.js";
import { checkUniqueArray } from "../lib/utils.js";

class Validator {
  static validatePurchaseAmount(purchaseAmount) {
    if (
      Number.isNaN(purchaseAmount) ||
      purchaseAmount <= 0 ||
      !Number.isInteger(purchaseAmount)
    ) {
      throw new Error(ERROR_MESSAGES.purchaseAmount.positiveInteger);
    }

    if (purchaseAmount % LOTTO_PRICE !== 0) {
      throw new Error(ERROR_MESSAGES.purchaseAmount.thousandUnit);
    }
  }

  static validateWinNumbers(winNumbers) {
    if (
      winNumbers.length !== 6 ||
      winNumbers.some(
        (number) =>
          number < MIN_LOTTO_NUMBER ||
          number > MAX_LOTTO_NUMBER ||
          Number.isNaN(number) ||
          number <= 0 ||
          !Number.isInteger(number)
      )
    ) {
      throw new Error(ERROR_MESSAGES.winNumber.range);
    }

    if (!checkUniqueArray(winNumbers)) {
      throw new Error(ERROR_MESSAGES.winNumber.unique);
    }
  }

  static validateBonusNumber(bonusNumber, winNumbers) {
    if (
      Number.isNaN(bonusNumber) ||
      bonusNumber <= 0 ||
      !Number.isInteger(bonusNumber) ||
      bonusNumber < MIN_LOTTO_NUMBER ||
      bonusNumber > MAX_LOTTO_NUMBER
    ) {
      throw new Error(ERROR_MESSAGES.bonusNumber.range);
    }

    if (winNumbers.includes(bonusNumber)) {
      throw new Error(ERROR_MESSAGES.bonusNumber.unique);
    }
  }

  static validateRetry(retryCommand) {
    if (retryCommand !== "y" && retryCommand !== "n") {
      throw new Error(ERROR_MESSAGES.retry.yesOrNo);
    }
  }
}

export default Validator;
