<<<<<<< HEAD
import { KEY, LOTTO } from '../constants/Configurations.js';
import { ERROR_MESSAGE } from '../constants/Messages.js';
import { validateRange, validateType } from './validate.js';

const validateDuplicateBonus = (bonusNumber, winningNumbers) => {
=======
import { KEY, LOTTO } from '../constants/CONFIGURATIONS.js';
import { ERROR_MESSAGE } from '../constants/MESSAGES.js';
import { validateRange, validateType } from './validate.js';

const validateDuplicate = (bonusNumber, winningNumbers) => {
>>>>>>> 0f9ff21ed0cd6104c06a2b5d22feb4bc389fa693
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
<<<<<<< HEAD
    validateDuplicateBonus(bonusNumber, winningNumbers);
  },
};

export { BonusNumberValidator, validateDuplicateBonus };
=======
    validateDuplicate(bonusNumber, winningNumbers);
  },
};

export { BonusNumberValidator, validateDuplicate };
>>>>>>> 0f9ff21ed0cd6104c06a2b5d22feb4bc389fa693
