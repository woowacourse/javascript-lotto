import { ERROR_MESSAGE } from '../constants/message';
import numberValidator from './numberValidator';

const bonusNumberValidator = {
  validate(bonusNumber, winningNumbers) {
    numberValidator.validate(bonusNumber);
    this.validateDuplicate(bonusNumber, winningNumbers);
  },

  validateDuplicate(bonusNumber, winningNumbers) {
    if (winningNumbers.includes(bonusNumber)) {
      throw new Error(ERROR_MESSAGE.BONUS_NUMBER_DUPLICATE);
    }
  },
};

export default bonusNumberValidator;
