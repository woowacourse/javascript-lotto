import { ERROR_MESSAGE, LOTTO_PRICE, LOTTO_RULES } from '../constant/index.js';

export const isInsufficientFare = (fare) => fare < LOTTO_PRICE;

export const isInvalidRangeNumber = (lottoNumber) =>
  lottoNumber < LOTTO_RULES.MIN_RANGE || lottoNumber > LOTTO_RULES.MAX_RANGE;

export const isInvalidRangeNumbers = (lottoNumbers) =>
  lottoNumbers.some((lottoNumber) => isInvalidRangeNumber(lottoNumber));

export const isOverlapped = (lottoNumbers) => {
  const lottoNumbersSet = new Set(lottoNumbers);

  return lottoNumbersSet.size !== lottoNumbers.length;
};

export const isInvalidCount = (lottoNumbers) => lottoNumbers.length !== LOTTO_RULES.BALL_COUNT;

export const isIncludedWinningNumbers = (winningNumbers, bonumsNumber) =>
  winningNumbers.includes(bonumsNumber);

export const validator = {
  validateFare: (fare) => {
    if (isInsufficientFare(fare)) {
      throw new Error(ERROR_MESSAGE.LACK_FARE);
    }
  },
  validateWinningNumbers: (winningNumbers) => {
    if (isInvalidRangeNumbers(winningNumbers)) {
      throw new Error(ERROR_MESSAGE.INVALID_RANGE_WINNING_NUMBERS);
    }

    if (isOverlapped(winningNumbers)) {
      throw new Error(ERROR_MESSAGE.OVERLAPPED_WINNING_NUMBERS);
    }

    if (isInvalidCount(winningNumbers)) {
      throw new Error(ERROR_MESSAGE.INVALID_COUNT_WINNING_NUMBERS);
    }
  },
  validateBonusNumber: (winningNumbers, bonusNumber) => {
    if (isIncludedWinningNumbers(winningNumbers, bonusNumber)) {
      throw new Error(ERROR_MESSAGE.INCLUDED_IN_WINNING_NUMBERS);
    }

    if (isInvalidRangeNumber(bonusNumber)) {
      throw new Error(ERROR_MESSAGE.INVALID_RANGE_BONUS_NUMBER);
    }
  },
};
