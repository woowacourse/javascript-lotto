import { ERROR_MESSAGE, VARIABLE_ALIAS } from '../../constant/Messages.js';
import OPTIONS from '../../constant/Options.js';
import Validation from './Validation.js';

class PurchaseAmountValidator {
  static validate(purchaseAmount) {
    this.validateIsInteger(purchaseAmount);
    this.validateIsAtLeast(purchaseAmount, OPTIONS.LOTTO.price);
  }

  static validateIsInteger(value) {
    if (!Validation.isInteger(value)) {
      throw new Error(
        `${ERROR_MESSAGE.prefix}${ERROR_MESSAGE.isNotInteger(VARIABLE_ALIAS.purchaseAmount)}`
      );
    }
  }

  static validateIsAtLeast(value, threshold) {
    if (!Validation.isAtLeast(value, threshold)) {
      throw new Error(
        `${ERROR_MESSAGE.prefix}${ERROR_MESSAGE.isNotAtLeast(VARIABLE_ALIAS.purchaseAmount, threshold)}`
      );
    }
  }
}

export default PurchaseAmountValidator;
