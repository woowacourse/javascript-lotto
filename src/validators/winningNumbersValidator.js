import { ERROR_MESSAGE } from '../constants/message.js';
import CONFIG from '../constants/config.js';
import numberValidator from './numberValidator.js';

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
    winningNumbers.forEach(winningNumber => {
      numberValidator.validateLottoNumber(winningNumber);
    });
  },
};

export default winningNumbersValidator;
