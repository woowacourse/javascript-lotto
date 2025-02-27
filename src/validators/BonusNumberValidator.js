import { KEY, LOTTO } from '../constants/Configurations.js';
import { ERROR_MESSAGE } from '../constants/Messages.js';
import { validateRange, validateType } from './validate.js';

const validateDuplicateBonus = (bonusNumber, winningNumbers) => {
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
    validateDuplicateBonus(bonusNumber, winningNumbers);
  },
};

export { BonusNumberValidator, validateDuplicateBonus };
