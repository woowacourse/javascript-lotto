import { ERROR } from '../constants/errors.js';
import { hasEmptyString, isValueInteger } from './validateInput.js';

const validateArrayOfWinningNumbers = (winningNumbers) => {
  winningNumbers.forEach((value) => {
    const winningNumber = Number(value);
    hasEmptyString(value);
    isValueInteger(winningNumber);

    if (winningNumber < 1 || winningNumber > 45) {
      throw new Error(ERROR.NOT_RANGE_OF_WINNING_NUMBER);
    }
  });
};

export const validateWinningNumbers = (input) => {
  const winningNumbers = input.split(',');
  const winningNumberSet = new Set(winningNumbers);

  if (winningNumberSet.size !== 6) {
    throw new Error(ERROR.DUPLICATED_WINNING_NUMBER);
  }

  if (winningNumbers.length !== 6) {
    throw new Error(ERROR.NOT_SAME_LENGTH_OF_WINNING_NUMBER);
  }

  validateArrayOfWinningNumbers(winningNumbers);
};

export const validateBonusNumber = (input, winningNumbers) => {
  const bonusNumber = Number(input);

  hasEmptyString(input);
  isValueInteger(bonusNumber);

  if (winningNumbers.includes(bonusNumber)) {
    throw new Error(ERROR.DUPLICATED_BONUS_NUMBER);
  }
};
