import { LOTTO } from '../domain/lottoConstants.js';
import { ERROR } from './errorConstants.js';
import { hasEmptyString, isValueInteger } from './validateInput.js';

const validateArrayOfWinningNumbers = (winningNumbers) => {
  winningNumbers.some((value) => {
    const winningNumber = Number(value);
    hasEmptyString(value);
    isValueInteger(winningNumber);

    checkRangeOfLottoNumber(winningNumber);
  });
};

export const validateWinningNumbers = (input) => {
  const winningNumbers = input.split(',');
  const winningNumberSet = new Set(winningNumbers);

  if (winningNumbers.length !== LOTTO.MAX_LENGTH) {
    throw new Error(ERROR.NOT_SAME_LENGTH_OF_WINNING_NUMBER);
  }

  if (winningNumberSet.size !== LOTTO.MAX_LENGTH) {
    throw new Error(ERROR.DUPLICATED_WINNING_NUMBER);
  }

  validateArrayOfWinningNumbers(winningNumbers);
};

export const validateBonusNumber = (input, winningNumbers) => {
  const bonusNumber = Number(input);

  hasEmptyString(input);
  isValueInteger(bonusNumber);
  checkRangeOfLottoNumber(bonusNumber);

  if (winningNumbers.includes(bonusNumber)) {
    throw new Error(ERROR.DUPLICATED_BONUS_NUMBER);
  }
};

const checkRangeOfLottoNumber = (input) => {
  if (input < LOTTO.MIN_RANDOM_NUMBER || input > LOTTO.MAX_RANDOM_NUMBER) {
    throw new Error(ERROR.NOT_RANGE_OF_WINNING_NUMBER);
  }
};
