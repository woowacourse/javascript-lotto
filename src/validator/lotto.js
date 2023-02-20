import { ONLY_NUMBER, ONLY_NUMBERS_WITH_COMMA } from '../constants/regExp.js';
import { LOTTO } from '../constants/values.js';
import { CustomError, ERROR_CODE } from '../utils/Error.js';

export function checkWinningNumberRange(number) {
  if (number < LOTTO.LOTTO_MIN_NUMBER || number > LOTTO.LOTTO_MAX_NUMBER) {
    throw new CustomError({
      code: ERROR_CODE.INVALID_NUMBER_RANGE,
      payload: { min: LOTTO.LOTTO_MIN_NUMBER, max: LOTTO.LOTTO_MAX_NUMBER },
      number,
    });
  }

  return true;
}

export function checkWinningNumbersRange(numbers) {
  return numbers.every(checkWinningNumberRange);
}

export function checkWinningNumbersFormat(winningNumber) {
  if (!ONLY_NUMBERS_WITH_COMMA.test(winningNumber)) {
    throw new CustomError({ code: ERROR_CODE.INVALID_FORMAT }, winningNumber);
  }

  return true;
}

export function checkBonusNumberFormat(bonusNumber) {
  if (!ONLY_NUMBER.test(bonusNumber) && checkWinningNumberRange(bonusNumber)) {
    throw new CustomError({ code: ERROR_CODE.INVALID_FORMAT }, bonusNumber);
  }
}
