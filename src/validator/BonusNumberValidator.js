import ERROR from "../constants/error-messages.js";
import AppError from "../utils/Error.js";

const bonusNumberValidator = {
  validateDuplication(numbers, bonusNumber) {
    if (numbers.includes(bonusNumber)) {
      throw new AppError(ERROR.INVALID_BONUS_NUMBER_DUPLICATE);
    }
  },
};
export default bonusNumberValidator;
