import { VARIABLE_ALIAS, ERROR_MESSAGES } from '../../constant/Messages.js';
import OPTIONS from '../../constant/Options.js';
import Validation from './Validation.js';

class LottoNumbersValidator {
  static name = VARIABLE_ALIAS.lottoNumbers;

  static validate(numbers) {
    this.validateHasLength(numbers, OPTIONS.LOTTO.combination);
    this.validateIsInteger(numbers);
    this.validateIsInRange(numbers, OPTIONS.LOTTO.minNumber, OPTIONS.LOTTO.maxNumber);
    this.validateIsUnique(numbers);
  }

  static validateHasLength(numbers, length) {
    if (!Validation.hasLength(numbers, length)) {
      throw new Error(`${ERROR_MESSAGES.prefix}${ERROR_MESSAGES.hasNotLength(this.name, length)}`);
    }
  }

  static validateIsInteger(numbers) {
    if (!numbers.every((number) => Validation.isInteger(number) && !isNaN(number))) {
      throw new Error(`${ERROR_MESSAGES.prefix}${ERROR_MESSAGES.isNotInteger(this.name)}`);
    }
  }

  static validateIsInRange(numbers, min, max) {
    if (!numbers.every((number) => Validation.isInRange(number, min, max))) {
      throw new Error(
        `${ERROR_MESSAGES.prefix}${ERROR_MESSAGES.isNotInRange(this.name, min, max)}`
      );
    }
  }

  static validateIsUnique(numbers) {
    if (!Validation.isUnique(numbers)) {
      throw new Error(`${ERROR_MESSAGES.prefix}${ERROR_MESSAGES.isNotUnique(this.name)}`);
    }
  }
}

export default LottoNumbersValidator;
