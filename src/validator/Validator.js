import { COMMAND, ERROR_MESSAGES, LOTTO_PRICE, MAX_LOTTO_NUMBER, MIN_LOTTO_NUMBER } from '../lib/constants.js';
import { checkUniqueArray } from '../lib/utils.js';

class Validator {
  static #checkIsPositiveInteger(value) {
    return !Number.isNaN(value) && value > 0 && Number.isInteger(value);
  }

  static #checkIsInLottoNumberRange(value) {
    return value >= MIN_LOTTO_NUMBER && value <= MAX_LOTTO_NUMBER;
  }

  static validatePurchaseAmount(purchaseAmount) {
    if (this.#checkIsPositiveInteger(purchaseAmount)) {
      throw new Error(ERROR_MESSAGES.purchaseAmount.positiveInteger);
    }

    if (purchaseAmount % LOTTO_PRICE !== 0) {
      throw new Error(ERROR_MESSAGES.purchaseAmount.thousandUnit);
    }
  }

  static validateWinNumbers(winNumbers) {
    if (
      winNumbers.length !== 6 ||
      winNumbers.some((number) => !this.#checkIsInLottoNumberRange(number) || !this.#checkIsPositiveInteger(winNumbers))
    ) {
      throw new Error(ERROR_MESSAGES.winNumber.range);
    }

    if (!checkUniqueArray(winNumbers)) {
      throw new Error(ERROR_MESSAGES.winNumber.unique);
    }
  }

  static validateBonusNumber(bonusNumber, winNumbers) {
    if (!this.#checkIsPositiveInteger(bonusNumber) || !this.#checkIsInLottoNumberRange(bonusNumber)) {
      throw new Error(ERROR_MESSAGES.bonusNumber.range);
    }

    if (winNumbers.includes(bonusNumber)) {
      throw new Error(ERROR_MESSAGES.bonusNumber.unique);
    }
  }

  static validateRetry(retryCommand) {
    if (retryCommand !== COMMAND.yes && retryCommand !== COMMAND.no) {
      throw new Error(ERROR_MESSAGES.retry.yesOrNo);
    }
  }
}

export default Validator;
