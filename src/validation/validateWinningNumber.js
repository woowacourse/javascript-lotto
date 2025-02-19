import { LOTTO_NUMBERS_ERROR_MESSAGE } from "../constants/errorMessage.js";
import runValidators from "../util/runValidators.js";
import validationCondition from "./validateCondition.js";

const checkEmptyInput = (winningNumberInput) => {
  if (validationCondition.isEmpty(winningNumberInput)) {
    throw new Error(LOTTO_NUMBERS_ERROR_MESSAGE.EMPTY);
  }
};

const checkEmptyItem = (winningNumberInput) => {
  if (winningNumberInput.some((number) => validationCondition.isEmpty(number))) {
    throw new Error(LOTTO_NUMBERS_ERROR_MESSAGE.EMPTY_ITEM);
  }
};
const checkIsNumber = (winningNumberInput) => {
  if (winningNumberInput.some((number) => !validationCondition.isNumber(number))) {
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
  console.log("출력+", "".split(","));
  const winningNumbers = winningNumberInput.split(",");
  return runValidators([checkEmptyInput, checkEmptyItem, checkIsNumber, checkLengthValid, checkRange, checkIsDistinct], winningNumbers);
};

export default validateWinningNumber;
