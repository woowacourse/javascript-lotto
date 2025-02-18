import { ERROR } from '../constants/errors.js';

export const hasEmptyString = (input) => {
  if (input === '') {
    throw new Error(ERROR.IS_VALUE_EMPTY);
  }
};

export const isValueInteger = (input) => {
  if (!Number.isInteger(input)) {
    throw new Error(ERROR.IS_NOT_POSITIVE_INTEGER);
  }
};

export const validatePurchasePrice = (input) => {
  const value = Number(input);

  hasEmptyString(input);
  isValueInteger(value);

  if (value < 1000) {
    throw new Error(ERROR.IS_LOWER_THAN_MINIMUM_OF_PUCHASE_PRICE);
  }
};

const validateArrayOfWinningNumbers = (winningNumbers) => {
  winningNumbers.forEach((value) => {
    const winningNumber = Number(value);
    hasEmptyString(value);
    isValueInteger(winningNumber);

    if (winningNumber < 1 || winningNumber > 45) {
      throw new Error(ERROR.IS_NOT_RANGE_OF_WINNING_NUMBER);
    }
  });
};

export const validateWinningNumbers = (input) => {
  const winningNumbers = input.split(',');
  const winningNumberSet = new Set(winningNumbers);

  if (winningNumberSet.size !== 6) {
    throw new Error(ERROR.IS_DUPLICATED_WINNING_NUMBER);
  }

  if (winningNumbers.length !== 6) {
    throw new Error(ERROR.IS_NOT_SAME_LENGTH_OF_WINNING_NUMBER);
  }

  validateArrayOfWinningNumbers(winningNumbers);
};

export const validateBonusNumber = (input, winningNumbers) => {
  const bonusNumber = Number(input);

  hasEmptyString(input);
  isValueInteger(bonusNumber);

  if (winningNumbers.includes(bonusNumber)) {
    throw new Error(ERROR.IS_BONUS_NUMBER_DUPLICATED);
  }
};
