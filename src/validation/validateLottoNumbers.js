import { ERROR } from './errorMessages.js';
import { LOTTO } from '../constants/messages.js';
import { hasEmptyString, isValueInteger } from './validateInput.js';

export const validateLottoNumbers = (lottoNumbers) => {
  if (!Array.isArray(lottoNumbers)) {
    lottoNumbers = [lottoNumbers];
  }
  lottoNumbers.forEach((value) => {
    const lottoNumber = Number(value);
    hasEmptyString(value);
    isValueInteger(lottoNumber);
    checkRangeOfLottoNumber(lottoNumber);
  });
};

export const checkRangeOfLottoNumber = (input) => {
  if (input < LOTTO.MIN_LOTTO_NUMBER || input > LOTTO.MAX_LOTTO_NUMBER) {
    throw new Error(ERROR.NOT_RANGE_OF_WINNING_NUMBER);
  }
};

export const validateWinningNumbers = (input) => {
  const winningNumbers = input.split(',');
  const winningNumberSet = new Set(winningNumbers);

  if (winningNumbers.length !== 6) {
    throw new Error(ERROR.NOT_SAME_LENGTH_OF_WINNING_NUMBER);
  }

  if (winningNumberSet.size !== 6) {
    throw new Error(ERROR.DUPLICATED_WINNING_NUMBER);
  }

  validateLottoNumbers(winningNumbers);
};

export const validateBonusNumber = (input, winningNumbers) => {
  const bonusNumber = Number(input);
  validateLottoNumbers(input);

  if (winningNumbers.includes(bonusNumber)) {
    throw new Error(ERROR.DUPLICATED_BONUS_NUMBER);
  }
};
