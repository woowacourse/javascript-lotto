import ERROR_MESSAGE from "../../constants/ERROR_MESSAGE.js";
import Validator from "../../utils/Validator.js";
const validateBonusNumber = (winningNumbers) => {
  return (bonusNumberInput) => {
    const bonusNumber = Number(bonusNumberInput);
    if (Validator.isEmpty(bonusNumber)) throw new Error(ERROR_MESSAGE.INVALID_BONUS_NUMBER_TYPE);
    if (Validator.isBonusNumberRange(bonusNumber)) throw new Error(ERROR_MESSAGE.INVALID_BONUS_NUMBER_RANGE);
    if (Validator.isIncludeNumber(winningNumbers, bonusNumber)) throw new Error(ERROR_MESSAGE.DUPLICATE_BONUS_NUMBER);
    return bonusNumber;
  };
};
export default validateBonusNumber;
