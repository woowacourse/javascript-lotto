import { LOTTO_MAX_NUMBER, LOTTO_MIN_NUMBER } from '../constants/values.js';
import { CustomError, ERROR_CODE } from '../utils/Error.js';

export function checkWinningNumberRange(number) {
  if (number < LOTTO_MIN_NUMBER || number > LOTTO_MAX_NUMBER) {
    throw new CustomError({
      code: ERROR_CODE.INVALID_NUMBER_RANGE,
      payload: { min: LOTTO_MIN_NUMBER, max: LOTTO_MAX_NUMBER },
      number,
    });
  }

  return true;
}

export function checkWinningNumbersRange(numbers) {
  return numbers.every(checkWinningNumberRange);
}

export function checkWinningNumbersFormat(winningNumber) {
  const regexp = /^\d+([,]\d+)*$/;

  if (!regexp.test(winningNumber)) {
    throw new CustomError({ code: ERROR_CODE.INVALID_FORMAT }, winningNumber);
  }

  return true;
}

export function checkBonusNumberFormat(bonusNumber) {
  const regexp = /^-?\d+$/;

  if (!regexp.test(bonusNumber) && checkWinningNumberRange(bonusNumber)) {
    throw new CustomError({ code: ERROR_CODE.INVALID_FORMAT }, bonusNumber);
  }
}
