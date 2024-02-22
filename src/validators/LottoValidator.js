import { ERROR_MESSAGES } from '../constants/messages';

const LottoValidator = {
  winningNumbersValidate(numbers) {
    this.validateLength(numbers);
    this.validateUniqueNumber(numbers);
    this.validateWinningNumbersRange(numbers);
  },

  bonusNumberValidate(winningNumbers, bonusNumber) {
    const convertedBonusNumber = Number(bonusNumber);
    this.validateRange(convertedBonusNumber);
    this.validateUniqueNumber([...winningNumbers, convertedBonusNumber]);
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

export default LottoValidator;
