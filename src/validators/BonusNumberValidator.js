import { KEY, LOTTO } from "../constants/CONFIGURATIONS.js";
import { ERROR_MESSAGE } from "../constants/MESSAGES.js";
import { validateRange, validateType } from "./validate.js";

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

const validateDuplicate = (bonusNumber, winningNumbers) => {
  if (winningNumbers.includes(bonusNumber)) {
    throw new Error(ERROR_MESSAGE.BONUS_NUMBER.DUPLICATE);
  }
};

export { BonusNumberValidator, validateDuplicate };
