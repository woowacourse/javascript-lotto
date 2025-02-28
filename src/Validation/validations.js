import {
  hasEmptySpace,
  isInteger,
  isValidPurchaseAmountUnit,
  isValidPurchaseAmountRange,
  hasValidLength,
  hasNoDuplicate,
  isInValidRange,
  hasNoEmptySpaceInArray,
  hasNoDuplicateBonusNumber,
  isValidRetryInput,
} from './validateUtils.js';

import {
  COMMON_ERROR_MESSAGE,
  LOTTO_PURCHASE_AMOUNT,
  LOTTO_WINNING_NUMBERS,
  LOTTO_BONUS_NUMBER,
  RETRY_MESSAGE,
} from '../View/Constant/errorMessage.js';
import { convertFormat } from '../View/Utils/utils.js';

// UI Validation
export const validateEmptySpace = (input) => {
  if (hasEmptySpace(input)) {
    throw new Error(COMMON_ERROR_MESSAGE.NO_EMPTY_SPACE);
  }
};

export const validateInteger = (input) => {
  if (!isInteger(input)) {
    throw new Error(COMMON_ERROR_MESSAGE.NOT_INTEGER);
  }
};

// Domain Validation
export const validatePurchaseAmount = (amount) => {
  if (!isValidPurchaseAmountUnit(amount)) {
    throw new Error(LOTTO_PURCHASE_AMOUNT.INVALID_PURCHASE_UNIT);
  }
  if (!isValidPurchaseAmountRange(amount)) {
    throw new Error(LOTTO_PURCHASE_AMOUNT.INVALID_PURCHASE_RANGE);
  }
};

export const validateLottoNumbers = (numbers) => {
  if (!hasValidLength(numbers)) {
    throw new Error(LOTTO_WINNING_NUMBERS.INVALID_LOTTO_COUNT);
  }
  if (!hasNoDuplicate(numbers)) {
    throw new Error(LOTTO_WINNING_NUMBERS.DUPLICATE_LOTTO_NUMBERS);
  }
  if (!numbers.every(isInValidRange)) {
    throw new Error(LOTTO_WINNING_NUMBERS.INVALID_LOTTO_RANGE);
  }
};

export const validateBonusNumber = (bonusNumber, winningNumbers) => {
  if (!isInValidRange(bonusNumber)) {
    throw new Error(LOTTO_BONUS_NUMBER.INVALID_BONUS_RANGE);
  }
  if (!hasNoDuplicateBonusNumber(bonusNumber, winningNumbers)) {
    throw new Error(LOTTO_BONUS_NUMBER.DUPLICATE_BONUS_NUMBER);
  }
};

// Combined Validations
export const validatePurchaseAmountInput = (input) => {
  validateEmptySpace(input);
  const convertedInput = Number(input);
  validateInteger(convertedInput);
  validatePurchaseAmount(convertedInput);
  return convertedInput;
};

export const validateWinningNumbersInput = (input) => {
  validateEmptySpace(input);
  const splittedInput = convertFormat.splitByComma(input);
  if (!hasNoEmptySpaceInArray(splittedInput)) {
    throw new Error(LOTTO_WINNING_NUMBERS.INVALID_LOTTO_NUMBERS);
  }
  const numbers = splittedInput.map(Number);
  if (!numbers.every(isInteger)) {
    throw new Error(COMMON_ERROR_MESSAGE.NOT_INTEGER);
  }
  validateLottoNumbers(numbers);
  return numbers;
};

export const validateBonusNumberInput = (input, winningNumbersInput) => {
  validateEmptySpace(input);
  const convertedInput = Number(input);
  validateInteger(convertedInput);
  validateBonusNumber(convertedInput, winningNumbersInput);
  return convertedInput;
};

export const validateRetryInput = (input) => {
  validateEmptySpace(input);
  if (!isValidRetryInput(input)) {
    throw new Error(RETRY_MESSAGE);
  }
  return input;
};
