import {
  COMMON_ERROR_MESSAGE,
  LOTTO_PURCHASE_AMOUNT,
  LOTTO_WINNING_NUMBERS,
  LOTTO_BONUS_NUMBER,
  RETRY_MESSAGE,
} from '../Constant/errorMessage.js';
import {
  hasEmptySpace,
  isInteger,
  isInvalidPurchaseAmountUnit,
  isInvalidPurchaseAmountRange,
  hasWrongLength,
  hasDuplicate,
  hasWrongRange,
  hasEmptySpaceInArray,
  hasDuplicateBonusNumber,
  isYorN,
} from './validateUtils.js';
import { convertFormat } from '../Utils/utils.js';

class Validator {
  static validateEmptySpace = (input) => {
    if (hasEmptySpace(input)) {
      throw new Error(`${COMMON_ERROR_MESSAGE.NO_EMPTY_SPACE}`);
    }
  };

  static validateInteger = (input) => {
    if (isInteger(input) === false) {
      throw new Error(`${COMMON_ERROR_MESSAGE.NOT_INTEGER}`);
    }
  };

  static validatePurchaseAmountUnit = (input) => {
    if (isInvalidPurchaseAmountUnit(input)) {
      throw new Error(LOTTO_PURCHASE_AMOUNT.INVALID_PURCHASE_UNIT);
    }
  };

  static validatePurchaseAmountRange = (input) => {
    if (isInvalidPurchaseAmountRange(input)) {
      throw new Error(LOTTO_PURCHASE_AMOUNT.INVALID_PURCHASE_RANGE);
    }
  };

  static validateEmptySpaceInWinningNumbers = (input) => {
    if (hasEmptySpaceInArray(input)) {
      throw new Error(LOTTO_WINNING_NUMBERS.INVALID_LOTTO_NUMBERS);
    }
  };

  static validateWrongWinningNumbersLength = (input) => {
    if (hasWrongLength(input)) {
      throw new Error(LOTTO_WINNING_NUMBERS.INVALID_LOTTO_COUNT);
    }
  };

  static validateDuplicateWinningNumbers = (input) => {
    if (hasDuplicate(input)) {
      throw new Error(LOTTO_WINNING_NUMBERS.DUPLICATE_LOTTO_NUMBERS);
    }
  };

  static validateWinningNumbersRange = (input) => {
    if (input.some((number) => hasWrongRange(number))) {
      throw new Error(LOTTO_WINNING_NUMBERS.INVALID_LOTTO_RANGE);
    }
  };
  static validateWinningNumbersInteger = (input) => {
    if (input.some((number) => !isInteger(number))) {
      throw new Error(COMMON_ERROR_MESSAGE.NOT_INTEGER);
    }
  };

  static validateBonusNumberRange = (input) => {
    if (hasWrongRange(input)) {
      throw new Error(LOTTO_BONUS_NUMBER.INVALID_BONUS_RANGE);
    }
  };

  static validateWinningNumberHasBonusNumber = (input, winningNumbersInput) => {
    if (hasDuplicateBonusNumber(input, winningNumbersInput)) {
      throw new Error(LOTTO_BONUS_NUMBER.DUPLICATE_BONUS_NUMBER);
    }
  };

  static validateYorN = (input) => {
    if (isYorN(input) === false) {
      throw new Error(RETRY_MESSAGE);
    }
  };

  static validatePurchaseAmount = (input) => {
    this.validateEmptySpace(input);
    const convertedInput = Number(input);
    this.validateInteger(convertedInput);
    this.validatePurchaseAmountUnit(convertedInput);
    this.validatePurchaseAmountRange(convertedInput);
    return convertedInput;
  };

  static validateWinningNumbers = (input) => {
    this.validateEmptySpace(input);
    const splittedInput = convertFormat.splitByComma(input);
    this.validateEmptySpaceInWinningNumbers(splittedInput);
    const numbers = splittedInput.map(Number);
    this.validateWrongWinningNumbersLength(numbers);
    this.validateDuplicateWinningNumbers(numbers);
    this.validateWinningNumbersRange(numbers);
    this.validateWinningNumbersInteger(numbers);
    return numbers;
  };

  static validateBonusNumber = (input, winningNumbersInput) => {
    this.validateEmptySpace(input);
    const convertedInput = Number(input);
    this.validateInteger(convertedInput);
    this.validateBonusNumberRange(convertedInput);
    this.validateWinningNumberHasBonusNumber(
      convertedInput,
      winningNumbersInput
    );
    return convertedInput;
  };

  static validateRetryInput = (input) => {
    this.validateEmptySpace(input);
    this.validateYorN(input);
    return input;
  };
}

export default Validator;
