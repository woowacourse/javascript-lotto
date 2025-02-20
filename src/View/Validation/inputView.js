import {
  COMMON_ERROR_MESSAGE,
  LOTTO_PURCHASE_AMOUNT,
  LOTTO_WINNING_NUMBERS,
  LOTTO_BONUS_NUMBER,
} from '../Constant/errorMessage.js';
import { LOTTO_DEFINITION } from '../../Domain/Constant/definition.js';

const hasEmptySpace = (input) => {
  return input.includes(' ') || input.trim() === '';
};

const isInteger = (input) => {
  return Number.isInteger(input);
};

const isInvalidPurchaseAmountUnit = (input) => {
  return input % 1_000 !== 0;
};

const isInvalidPurchaseAmountRange = (input) => {
  return input < 1_000 || input > 100_000;
};

export const validateEmptySpace = (input) => {
  if (hasEmptySpace(input)) {
    throw new Error(`${COMMON_ERROR_MESSAGE.NO_EMPTY_SPACE}`);
  }
};

const validateInteger = (input) => {
  if (isInteger(input) === false) {
    throw new Error(`${COMMON_ERROR_MESSAGE.NOT_INTEGER}`);
  }
};

const validatePurchaseAmountUnit = (input) => {
  if (isInvalidPurchaseAmountUnit(input)) {
    throw new Error(LOTTO_PURCHASE_AMOUNT.INVALID_PURCHASE_UNIT);
  }
};

const validatePurchaseAmountRange = (input) => {
  if (isInvalidPurchaseAmountRange(input)) {
    throw new Error(LOTTO_PURCHASE_AMOUNT.INVALID_PURCHASE_RANGE);
  }
};

export const validatePurchaseAmount = (input) => {
  validateInteger(input);
  validatePurchaseAmountUnit(input);
  validatePurchaseAmountRange(input);
};

export const hasEmptySpaceInArray = (input) => {
  return input.some((input) => hasEmptySpace(input));
};

export const validateEmptySpaceInWinningNumbers = (input) => {
  if (hasEmptySpaceInArray(input)) {
    throw new Error(LOTTO_WINNING_NUMBERS.INVALID_LOTTO_NUMBERS);
  }
};

const hasWrongLength = (input) => {
  return LOTTO_DEFINITION.NUMBER_COUNTS !== new Set(input).size;
};

export const validateWrongWinningNumbersLength = (input) => {
  if (hasWrongLength(input)) {
    throw new Error(LOTTO_WINNING_NUMBERS.INVALID_LOTTO_COUNT);
  }
};

const hasDuplicate = (input) => {
  return input.length !== new Set(input).size;
};

export const validateDuplicateWinningNumbers = (input) => {
  if (hasDuplicate(input)) {
    throw new Error(LOTTO_WINNING_NUMBERS.DUPLICATE_LOTTO_NUMBERS);
  }
};

const hasWrongRange = (input) => {
  return input < 1 || input > 45;
};

const validateWinningNumbersRange = (input) => {
  if (input.some((number) => hasWrongRange(number))) {
    throw new Error(LOTTO_WINNING_NUMBERS.INVALID_LOTTO_RANGE);
  }
};
const validateWinningNumbersInteger = (input) => {
  if (input.some((number) => !isInteger(number))) {
    throw new Error(COMMON_ERROR_MESSAGE.NOT_INTEGER);
  }
};

export const validateWinningNumbers = (input) => {
  validateWrongWinningNumbersLength(input);
  validateDuplicateWinningNumbers(input);
  validateWinningNumbersRange(input);
  validateWinningNumbersInteger(input);
};

const validateBonusNumberRange = (input) => {
  if (hasWrongRange(input)) {
    throw new Error(LOTTO_BONUS_NUMBER.INVALID_BONUS_RANGE);
  }
};
const hasDuplicateBonusNumber = (input, winningNumbersInput) => {
  return winningNumbersInput.includes(input);
};

const validateWinningNumberHasBonusNumber = (input, winningNumbersInput) => {
  if (hasDuplicateBonusNumber(input, winningNumbersInput)) {
    throw new Error(LOTTO_BONUS_NUMBER.DUPLICATE_BONUS_NUMBER);
  }
};

export const validateBonusNumber = (input, winningNumbersInput) => {
  validateInteger(input);
  validateBonusNumberRange(input);
  validateWinningNumberHasBonusNumber(input, winningNumbersInput);
};
