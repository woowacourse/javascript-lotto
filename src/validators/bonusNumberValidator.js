import { ERROR_MESSAGE } from '../constants/message';

const bonusNumberValidator = {
  validate(bonusNumber, winningNumbers) {
    this.validateDuplicate(bonusNumber, winningNumbers);
  },

  validateDuplicate(bonusNumber, winningNumbers) {
    if (winningNumbers.includes(bonusNumber)) {
      throw new Error(ERROR_MESSAGE.BONUS_NUMBER_DUPLICATE);
    }
  },
};

export default bonusNumberValidator;
