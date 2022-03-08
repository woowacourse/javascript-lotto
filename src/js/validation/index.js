import { ERROR_MESSAGE, LOTTO_PRICE, LOTTO_RULES } from '../constant/index.js';

export const isInsufficientFare = (fare) => fare < LOTTO_PRICE;

export const isOverRangeBonusNumber = (bonusNumber) =>
  bonusNumber < LOTTO_RULES.MIN_RANGE || bonusNumber > LOTTO_RULES.MAX_RANGE;

export const isOverRangeWinningNumbers = (winningNumbers) =>
  winningNumbers.some(
    (winningNumber) =>
      winningNumber < LOTTO_RULES.MIN_RANGE || winningNumber > LOTTO_RULES.MAX_RANGE,
  );

export const isOverlapped = (lottoNumbers) => {
  const lottoNumbersSet = new Set(lottoNumbers);

  return lottoNumbersSet.size !== lottoNumbers.length;
};

export const isInvalidCount = (lottoNumbers) => lottoNumbers.length !== LOTTO_RULES.BALL_COUNT;

export const isIncludedWinningNumbers = (winningNumbers, bonusNumber) =>
  winningNumbers.includes(bonusNumber);

export const validator = {
  validateFare: (fare) => {
    if (isInsufficientFare(fare)) {
      throw new Error(ERROR_MESSAGE.LACK_FARE);
    }
  },
  validateWinningNumbers: (winningNumbers) => {
    if (isOverRangeWinningNumbers(winningNumbers)) {
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

    if (isOverRangeBonusNumber(bonusNumber)) {
      throw new Error(ERROR_MESSAGE.INVALID_RANGE_BONUS_NUMBER);
    }
  },
};
