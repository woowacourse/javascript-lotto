import { KEY, LOTTO } from '../constants/CONFIGURATIONS.js';
import { ERROR_MESSAGE } from '../constants/MESSAGES.js';
import { validateRange, validateType } from './validate.js';

const validateDuplicate = (bonusNumber, winningNumbers) => {
  if (winningNumbers.includes(bonusNumber)) {
    throw new Error(ERROR_MESSAGE.BONUS_NUMBER.DUPLICATE);
  }
};

const BonusNumberValidator = {
  validate: (bonusNumber, winningNumbers) => {
    validateType(KEY.BONUS_NUMBER, bonusNumber);
    validateRange({
      key: KEY.BONUS_NUMBER,
      value: bonusNumber,
      min: LOTTO.MIN_NUMBER,
      max: LOTTO.MAX_NUMBER,
    });
    validateDuplicate(bonusNumber, winningNumbers);
  },
};

export { BonusNumberValidator, validateDuplicate };
