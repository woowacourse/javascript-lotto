import { ERROR_MESSAGE, LOTTO_PRICE, LOTTO_RULES } from '../constant/index.js';

export const isEnoughFare = (fare) => fare >= LOTTO_PRICE;

export const isValidRangeNumber = (lottoNumber) =>
  lottoNumber >= LOTTO_RULES.MIN_RANGE && lottoNumber <= LOTTO_RULES.MAX_RANGE;

export const isValidRangeNumbers = (lottoNumbers) =>
  lottoNumbers.every((lottoNumber) => isValidRangeNumber(lottoNumber));

export const isNotOverlapped = (lottoNumbers) => {
  const lottoNumbersSet = new Set(lottoNumbers);

  return lottoNumbersSet.size === lottoNumbers.length;
};

export const isValidCount = (lottoNumbers) => lottoNumbers.length === LOTTO_RULES.BALL_COUNT;

export const isNotIncludeWinningNumbers = (winnerNumbers, bonumsNumber) =>
  !winnerNumbers.includes(bonumsNumber);

export const validator = {
  validateFare: (fare) => {
    if (!isEnoughFare(fare)) {
      throw new Error(ERROR_MESSAGE.LACK_FARE);
    }
  },
  validateWinningNumbers: (winningNumbers) => {
    if (!isValidRangeNumbers(winningNumbers)) {
      throw new Error(ERROR_MESSAGE.INVALID_RANGE_WINNING_NUMBERS);
    }

    if (!isNotOverlapped(winningNumbers)) {
      throw new Error(ERROR_MESSAGE.OVERLAPPED_WINNING_NUMBERS);
    }

    if (!isValidCount(winningNumbers)) {
      throw new Error(ERROR_MESSAGE.INVALID_COUNT_WINNING_NUMBERS);
    }
  },
};
