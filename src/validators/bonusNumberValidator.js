import { ERROR_MESSAGE } from '../constants/message.js';
import numberValidator from './numberValidator.js';

const bonusNumberValidator = {
  validate(bonusNumber, winningNumbers) {
    numberValidator.validateLottoNumber(bonusNumber);
    this.validateDuplicate(bonusNumber, winningNumbers);
  },

  validateDuplicate(bonusNumber, winningNumbers) {
    if (winningNumbers.includes(bonusNumber)) {
      throw new Error(ERROR_MESSAGE.BONUS_NUMBER_DUPLICATE);
    }
  },
};

export default bonusNumberValidator;
