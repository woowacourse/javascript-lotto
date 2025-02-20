import validationCondition from "./validateCondition.js";
import runValidators from "../util/runValidators.js";
import { BONUS_NUMBER_ERROR_MESSAGE } from "../constants/errorMessage.js";

const checkIsEmpty = (bonusNumberInput) => {
  if (validationCondition.isEmpty(bonusNumberInput)) {
    throw new Error(BONUS_NUMBER_ERROR_MESSAGE.EMPTY);
  }
};
const checkIsNumber = (bonusNumberInput) => {
  if (!validationCondition.isNumber(bonusNumberInput)) {
    throw new Error(BONUS_NUMBER_ERROR_MESSAGE.NUMBER);
  }
};
const checkRange = (bonusNumberInput) => {
  if (!validationCondition.isBonusRangeValid(bonusNumberInput)) {
    throw new Error(BONUS_NUMBER_ERROR_MESSAGE.RANGE);
  }
};
const checkDuplicate = (winningNumbers, bonusNumberInput) => {
  if (!validationCondition.isBonusDistinct(winningNumbers, bonusNumberInput)) {
    throw new Error(BONUS_NUMBER_ERROR_MESSAGE.DUPLICATE);
  }
};

const validateBonusNumber = (bonusNumberInput, winningNumbers) => {
  runValidators([checkIsEmpty, checkIsNumber, checkRange, checkDuplicate, (number) => checkDuplicate(number, winningNumbers)], bonusNumberInput);
};

export default validateBonusNumber;
