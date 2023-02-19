import { ONLY_NUMBER, ONLY_NUMBERS_WITH_COMMA } from '../constants/regExp.js';
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
}

export function checkWinningNumbersRange(numbers) {
  return numbers.every(checkWinningNumberRange);
}

export function checkWinningNumbersFormat(winningNumber) {
  if (!ONLY_NUMBERS_WITH_COMMA.test(winningNumber)) {
    throw new CustomError({ code: ERROR_CODE.INVALID_FORMAT }, winningNumber);
  }
}

export function checkBonusNumberFormat(bonusNumber) {
  if (!ONLY_NUMBER.test(bonusNumber) || checkWinningNumberRange(bonusNumber)) {
    throw new CustomError({ code: ERROR_CODE.INVALID_FORMAT }, bonusNumber);
  }
}
