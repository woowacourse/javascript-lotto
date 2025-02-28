import {
  isInteger,
  hasNoEmptySpaceInArray,
  isValidRetryInput,
} from './validations.js';

import {
  COMMON_ERROR_MESSAGE,
  LOTTO_WINNING_NUMBERS,
  RETRY_MESSAGE,
} from '../View/Constant/errorMessage.js';
import { convertFormat } from '../View/Utils/utils.js';
import {
  validatePurchaseAmount,
  validateLottoNumbers,
  validateBonusNumber,
} from './validateDomain.js';
import { validateEmptySpace, validateInteger } from './validateUtils.js';

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
