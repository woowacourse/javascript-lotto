import { ERROR_MESSAGES } from '../constants/messages';

const LottoNumbersValidator = {
  winningNumbersValidate(numbers) {
    this.validateLength(numbers);
    this.validateUniqueNumber(numbers, 6);
    this.validateWinningNumbersRange(numbers);
  },

  bonusNumberValidate(number) {
    this.validateRange(number);
    this.isValidUniqueNumber(number, 7);
  },

  isValidLength(numbers) {
    return numbers.length === 6;
  },

  validateLength(numbers) {
    if (!this.isValidLength(numbers)) {
      throw new Error(ERROR_MESSAGES.invalidLength);
    }
  },

  isValidUniqueNumber(numbers) {
    return new Set(numbers).size === numbers.length;
  },

  validateUniqueNumber(numbers) {
    if (!this.isValidUniqueNumber(numbers)) {
      throw new Error(ERROR_MESSAGES.invalidUniqueNumber);
    }
  },

  isInRange(number) {
    return number >= 1 && number <= 45;
  },

  validateRange(number) {
    if (!this.isInRange(number)) {
      throw new Error(ERROR_MESSAGES.invalidRange);
    }
  },

  validateWinningNumbersRange(numbers) {
    numbers.some((number) => this.validateRange(number));
  },
};

export default LottoNumbersValidator;
