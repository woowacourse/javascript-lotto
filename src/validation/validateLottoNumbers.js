import { ERROR } from './errorMessages.js';
import { LOTTO_SYSTEM } from '../constants/LottoSystem.js';
import { hasEmptyString, isValueInteger } from './validateInput.js';

export const validateLottoNumbers = (lottoNumbers) => {
  if (!Array.isArray(lottoNumbers)) {
    lottoNumbers = [lottoNumbers];
  }

  lottoNumbers.forEach((value) => {
    const lottoNumber = Number(value);
    if (hasEmptyString(value)) throw new Error(ERROR.EMPTY_VALUE);
    if (!isValueInteger(lottoNumber)) throw new Error(ERROR.NOT_POSITIVE_INTEGER);
    if (!isInRangeOfLottoNumber(lottoNumber)) throw new Error(ERROR.NOT_RANGE_OF_WINNING_NUMBER);
  });
};

export const isInRangeOfLottoNumber = (input) =>
  input >= LOTTO_SYSTEM.SIZE.MIN_LOTTO_NUMBER && input <= LOTTO_SYSTEM.SIZE.MAX_LOTTO_NUMBER;

export const validateWinningNumbers = (input) => {
  const winningNumbers = typeof input === 'string' ? input.split(',') : input;
  const winningNumberSet = new Set(winningNumbers);

  if (winningNumbers.length !== LOTTO_SYSTEM.SIZE.MAX_LENGTH) {
    throw new Error(ERROR.NOT_SAME_LENGTH_OF_WINNING_NUMBER);
  }

  if (winningNumberSet.size !== LOTTO_SYSTEM.SIZE.MAX_LENGTH) {
    throw new Error(ERROR.DUPLICATED_WINNING_NUMBER);
  }

  validateLottoNumbers(winningNumbers);
};

export const validateBonusNumber = (winningNumbers) => (input) => {
  const bonusNumber = Number(input);
  validateLottoNumbers(input);

  if (winningNumbers.includes(bonusNumber)) {
    throw new Error(ERROR.DUPLICATED_BONUS_NUMBER);
  }
};
