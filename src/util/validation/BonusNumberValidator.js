import { VARIABLE_ALIAS, ERROR_MESSAGES } from '../../constant/Messages.js';
import OPTIONS from '../../constant/Options.js';
import Validation from './Validation.js';

class BonusNumberValidator {
  static name = VARIABLE_ALIAS.bonusNumber;

  static validate(bonusNumber, winningNumbers) {
    this.validateIsInteger(bonusNumber);
    this.validateIsInRange({
      number: bonusNumber,
      min: OPTIONS.LOTTO.minNumber,
      max: OPTIONS.LOTTO.maxNumber
    });
    this.validateIsNotIncluded(bonusNumber, winningNumbers);
  }

  static validateIsInteger(number) {
    if (!Validation.isInteger(number)) {
      throw new Error(`${ERROR_MESSAGES.prefix}${ERROR_MESSAGES.isNotInteger(this.name)}`);
    }
  }

  static validateIsInRange({ number, min, max }) {
    if (!Validation.isInRange({ value: number, min, max })) {
      throw new Error(
        `${ERROR_MESSAGES.prefix}${ERROR_MESSAGES.isNotInRange({ name: this.name, min, max })}`
      );
    }
  }

  static validateIsNotIncluded(number, numbers) {
    if (Validation.isIncluded(numbers, number)) {
      throw new Error(`${ERROR_MESSAGES.prefix}${ERROR_MESSAGES.isNotUnique(this.name)}`);
    }
  }
}

export default BonusNumberValidator;
