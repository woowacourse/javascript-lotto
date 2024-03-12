import { ERROR_MESSAGES, VARIABLE_ALIAS } from '../../constant/Messages.js';
import OPTIONS from '../../constant/Options.js';
import Validation from './Validation.js';

class PurchaseAmountValidator {
  static name = VARIABLE_ALIAS.purchaseAmount;

  static validate(purchaseAmount) {
    this.validateIsNumber(purchaseAmount);
    const numberInput = this.convertToNumber(purchaseAmount);
    this.validateIsInteger(numberInput);
    this.validateIsAtLeast(numberInput, OPTIONS.LOTTO.price);
    return numberInput;
  }

  static convertToNumber(purchaseAmount) {
    return parseInt(purchaseAmount, 10);
  }

  static validateIsNumber(value) {
    if (!/^\d+$/.test(value)) {
      throw new Error(`${ERROR_MESSAGES.prefix}${ERROR_MESSAGES.isNotNumber(this.name)}`);
    }
  }

  static validateIsInteger(value) {
    if (!Validation.isInteger(value)) {
      throw new Error(`${ERROR_MESSAGES.prefix}${ERROR_MESSAGES.isNotInteger(this.name)}`);
    }
  }

  static validateIsAtLeast(value, threshold) {
    if (!Validation.isAtLeast(value, threshold)) {
      throw new Error(
        `${ERROR_MESSAGES.prefix}${ERROR_MESSAGES.isNotAtLeast(this.name, threshold)}`
      );
    }
  }
}

export default PurchaseAmountValidator;
