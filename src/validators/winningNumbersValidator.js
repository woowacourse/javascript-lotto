import CONFIG from '../constants/config';
import { ERROR_MESSAGE } from '../constants/message';
import numberValidator from './numberValidator';

const winningNumbersValidator = {
  validate(winningNumbers) {
    this.validateDuplicate(winningNumbers);
    this.validateLength(winningNumbers.length);
    this.validateRange(winningNumbers);
  },

  validateDuplicate(winningNumbers) {
    if (winningNumbers.length !== new Set(winningNumbers).size) {
      throw new Error(ERROR_MESSAGE.WINNING_NUMBERS_DUPLICATE);
    }
  },

  validateLength(length) {
    if (length !== CONFIG.LOTTO_LENGTH) {
      throw new Error(ERROR_MESSAGE.LOTTO_LENGTH);
    }
  },

  validateRange(winningNumbers) {
    for (let i = 0; i < winningNumbers.length; i++) {
      numberValidator.validate(winningNumbers[i]);
      numberValidator.validateRange(winningNumbers[i]);
    }
  },
};

export default winningNumbersValidator;
