import { hasEmptySpaceInArray, isInteger } from './util.js';
import {
  COMMON_ERROR_MESSAGE,
  LOTTO_WINNING_NUMBERS,
} from '../Constant/errorMessage.js';
import { LOTTO_DEFINITION } from '../../Domain/Constant/definition.js';
import { hasWrongLottoNumberRange } from './lottoNumberRange.js';

const hasWrongLength = (input) => {
  return LOTTO_DEFINITION.NUMBER_COUNTS !== input.length;
};

const hasDuplicate = (input) => {
  return input.length !== new Set(input).size;
};

const validateWrongWinningNumbersLength = (input) => {
  if (hasWrongLength(input)) {
    throw new Error(LOTTO_WINNING_NUMBERS.INVALID_LOTTO_COUNT);
  }
};

const validateDuplicateWinningNumbers = (input) => {
  if (hasDuplicate(input)) {
    throw new Error(LOTTO_WINNING_NUMBERS.DUPLICATE_LOTTO_NUMBERS);
  }
};

const validateWinningNumbersRange = (input) => {
  if (input.some((number) => hasWrongLottoNumberRange(number))) {
    throw new Error(LOTTO_WINNING_NUMBERS.INVALID_LOTTO_RANGE);
  }
};

const validateWinningNumbersInteger = (input) => {
  if (input.some((number) => isInteger(number) === false)) {
    throw new Error(COMMON_ERROR_MESSAGE.NOT_INTEGER);
  }
};

export const validateEmptySpaceInWinningNumbers = (input) => {
  if (hasEmptySpaceInArray(input)) {
    throw new Error(LOTTO_WINNING_NUMBERS.INVALID_LOTTO_NUMBERS);
  }
};

export const validateWinningNumbers = (input) => {
  validateWrongWinningNumbersLength(input);
  validateDuplicateWinningNumbers(input);
  validateWinningNumbersRange(input);
  validateWinningNumbersInteger(input);
};
