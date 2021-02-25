import { hasElementOutOfRange, isShortLength, hasDuplicatedElement } from '../utils/general.js';
import {
  LOTTO_MIN_NUMBER,
  LOTTO_MAX_NUMBER,
  WINNING_NUMBER_CHECK_MESSAGE,
  TOTAL_NUMBERS_LENGTH,
} from '../constants.js';

export const validateInput = (inputNumbersExceptBlank) => {
  if (hasElementOutOfRange(inputNumbersExceptBlank, { min: LOTTO_MIN_NUMBER, max: LOTTO_MAX_NUMBER })) {
    return {
      isFulfilled: false,
      checkMessage: WINNING_NUMBER_CHECK_MESSAGE.OUT_OF_RANGE,
    };
  }

  if (hasDuplicatedElement(inputNumbersExceptBlank)) {
    return {
      isFulfilled: false,
      checkMessage: WINNING_NUMBER_CHECK_MESSAGE.DUPLICATED,
    };
  }

  if (isShortLength(inputNumbersExceptBlank, TOTAL_NUMBERS_LENGTH)) {
    return {
      isFulfilled: false,
      checkMessage: WINNING_NUMBER_CHECK_MESSAGE.HAS_BLANK,
    };
  }

  return {
    isFulfilled: true,
    checkMessage: WINNING_NUMBER_CHECK_MESSAGE.FULFILLED,
  };
};
