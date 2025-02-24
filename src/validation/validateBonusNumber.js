import validationCondition from "./validateCondition.js";
import runValidators from "../util/runValidators.js";
import { BONUS_NUMBER_ERROR_MESSAGE } from "../constants/errorMessage.js";

const checkIsEmpty = (bonusNumberInput) => {
  if (validationCondition.isEmpty(bonusNumberInput)) {
    throw new Error(BONUS_NUMBER_ERROR_MESSAGE.EMPTY);
  }
};
const checkIsInteger = (bonusNumberInput) => {
  if (!validationCondition.isInteger(bonusNumberInput)) {
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

const checkDuplicatedWinningNumber = (winningNumbers) => (bonusNumberInput) => checkDuplicate(winningNumbers, bonusNumberInput);

const validateBonusNumber = (winningNumbers, bonusNumberInput) => {
  runValidators([checkIsEmpty, checkIsInteger, checkRange, checkDuplicatedWinningNumber(winningNumbers)], bonusNumberInput);
};

export default validateBonusNumber;
