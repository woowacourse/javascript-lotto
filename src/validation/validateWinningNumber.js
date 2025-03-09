import { LOTTO_NUMBERS_ERROR_MESSAGE } from '../constants/errorMessage.js';
import runValidators from '../util/runValidators.js';
import checkEmptyInput from './checkEmptyInput.js';
import validationCondition from './validateCondition.js';

const checkEmpty = (winningNumberInput) => checkEmptyInput(winningNumberInput, LOTTO_NUMBERS_ERROR_MESSAGE.EMPTY);
const checkEmptyItem = (winningNumberInput) => {
  if (winningNumberInput.some((number) => validationCondition.isEmpty(number))) {
    throw new Error(LOTTO_NUMBERS_ERROR_MESSAGE.EMPTY_ITEM);
  }
};
const checkIsInteger = (winningNumberInput) => {
  if (winningNumberInput.some((number) => !validationCondition.isInteger(number))) {
    throw new Error(LOTTO_NUMBERS_ERROR_MESSAGE.NUMBER);
  }
};

const checkLengthValid = (winningNumberInput) => {
  if (!validationCondition.isLengthValid(winningNumberInput)) {
    throw new Error(LOTTO_NUMBERS_ERROR_MESSAGE.LENGTH);
  }
};

const checkRange = (winningNumberInput) => {
  if (!validationCondition.isRangeValid(winningNumberInput)) {
    throw new Error(LOTTO_NUMBERS_ERROR_MESSAGE.RANGE);
  }
};

const checkIsDistinct = (winningNumberInput) => {
  if (!validationCondition.isDistinct(winningNumberInput)) {
    throw new Error(LOTTO_NUMBERS_ERROR_MESSAGE.DUPLICATE);
  }
};
const validateWinningNumber = (winningNumberInput) => {
  return runValidators(
    [checkEmpty, checkEmptyItem, checkIsInteger, checkLengthValid, checkRange, checkIsDistinct],
    winningNumberInput
  );
};

export default validateWinningNumber;
