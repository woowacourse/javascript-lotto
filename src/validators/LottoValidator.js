import { ERROR_MESSAGES } from '../constants/messages';
import LOTTO_RULES from '../constants/lotto-rules';

const LottoValidator = {
  winningNumbersValidate(numbers) {
    this.validateLength(numbers);
    this.validateUniqueNumber(numbers);
    this.validateWinningNumbersRange(numbers);
  },

  bonusNumberValidate(winningNumbers, bonusNumber) {
    this.validateRange(bonusNumber);
    this.validateUniqueNumber([...winningNumbers, bonusNumber]);
  },

  isValidLength(numbers) {
    return numbers.length === LOTTO_RULES.winningNumbersLength;
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
    return number >= LOTTO_RULES.minLength && number <= LOTTO_RULES.maxLength;
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
