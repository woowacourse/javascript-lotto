
import { bonusNumberValidator } from "../validator/bonusNumberValidator.js";
import { BONUS_NUMBER_ERROR_MESSAGES } from "../../constants/constants.js";
import runValidators from "../../utils/runValidators.js";

const validateInteger = (winningNumbers,bonusNumber) => {
  if (!bonusNumberValidator.isInteger(bonusNumber)) {
    throw new Error(BONUS_NUMBER_ERROR_MESSAGES.INTIGER);
  }
};

const validateRange = (winningNumbers, bonusNumber) => {  
  if (!bonusNumberValidator.isValidRange(bonusNumber)) {
    throw new Error(BONUS_NUMBER_ERROR_MESSAGES.RANGE);
  }
};

const validateDuplicate = (winningNumbers, bonusNumber) => {  
    if (bonusNumberValidator.isDuplicated(winningNumbers, bonusNumber)) {
      throw new Error(BONUS_NUMBER_ERROR_MESSAGES.DUPLICATE);
    }
  };

const validateBonusNumber = (winningNumbers, bonusNumber) =>
  runValidators(
    [validateInteger, validateRange, validateDuplicate],
    winningNumbers,bonusNumber,
  );

export default validateBonusNumber;
