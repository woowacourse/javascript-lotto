import ERROR_MESSAGE from "../constants/error-messages.js";
import { LOTTO_NUMBER_RANGE } from "../constants/lotto-constants.js";
import AppError from "../utils/Error.js";

const bonusNumberValidator = {
  validateDuplication(numbers, bonusNumber) {
    if (numbers.includes(bonusNumber)) {
      throw new AppError(ERROR_MESSAGE.INVALID_BONUS_NUMBER_DUPLICATE);
    }
  },

  validateRange(number) {
    if (number < LOTTO_NUMBER_RANGE.MIN || number > LOTTO_NUMBER_RANGE.MAX) {
      throw new AppError(ERROR_MESSAGE.INVALID_BONUS_NUMBER_RANGE);
    }
  },

  validateIsNumber(number) {
    if (!Number.isInteger(number)) {
      throw new AppError(ERROR_MESSAGE.INVALID_BONUS_NUMBER_TYPE);
    }
  },

  validate(number) {
    const formatedNumbnumber = Number(number);
    this.validateIsNumber(formatedNumbnumber);
    this.validateRange(formatedNumbnumber);
  },
};

export default bonusNumberValidator;
