import { validateInteger } from './util.js';
import { LOTTO_BONUS_NUMBER } from '../Constant/errorMessage.js';
import { hasWrongLottoNumberRange } from './lottoNumberRange.js';

const hasDuplicateBonusNumber = (input, winningNumbersInput) => {
  return winningNumbersInput.includes(input);
};

const validateBonusNumberRange = (input) => {
  if (hasWrongLottoNumberRange(input)) {
    throw new Error(LOTTO_BONUS_NUMBER.INVALID_BONUS_RANGE);
  }
};

const validateWinningNumberHasBonusNumber = (input, winningNumbersInput) => {
  if (hasDuplicateBonusNumber(input, winningNumbersInput)) {
    throw new Error(LOTTO_BONUS_NUMBER.DUPLICATE_BONUS_NUMBER);
  }
};

export const validateBonusNumber = (input, winningNumbersInput) => {
  validateInteger(input);
  validateBonusNumberRange(input);
  validateWinningNumberHasBonusNumber(input, winningNumbersInput);
};
