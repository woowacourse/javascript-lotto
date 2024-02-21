import ERROR from "../constants/error.js";

const bonusNumberValidator = {
  validateDuplication(numbers, bonusNumber) {
    if (numbers.includes(bonusNumber)) {
      throw new Error(ERROR.INVALID_BONUS_NUMBER_DUPLICATE);
    }
  },
};
export default bonusNumberValidator;
