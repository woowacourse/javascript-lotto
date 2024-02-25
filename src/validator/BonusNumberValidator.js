import ERROR from "../constants/error.js";
import { LOTTO_RANGE } from "../constants/option.js";

const validate = {
  validateDuplication(numbers, bonusNumber) {
    if (numbers.includes(bonusNumber)) {
      throw new Error(ERROR.INVALID_BONUS_NUMBER_DUPLICATE);
    }
  },

  validateRange(bonusNumber) {
    if (bonusNumber < LOTTO_RANGE.MIN || bonusNumber > LOTTO_RANGE.MAX) {
      throw new Error(ERROR.INVALID_BONUS_NUMBER_RANGE);
    }
  },

  validateType(bonusNumber) {
    if (!Number.isInteger(bonusNumber)) {
      throw new Error(ERROR.INVALID_BONUS_NUMBER_TYPE);
    }
  },
};

export default function bonusNumberValidator(numbers, bonusNumber) {
  validate.validateDuplication(numbers, bonusNumber);
  validate.validateRange(bonusNumber);
  validate.validateType(bonusNumber);
}
