import { LOTTO, REGEXP } from '../constants/lottoConstants.js';
import { CustomError, ERROR_CODE } from '../utils/Error.js';

export function checkWinningNumberRange(number) {
  if (number < LOTTO.MIN_NUMBER || number > LOTTO.MAX_NUMBER) {
    throw new CustomError({
      code: ERROR_CODE.INVALID_NUMBER_RANGE,
      payload: { min: LOTTO.MIN_NUMBER, max: LOTTO.MAX_NUMBER },
      number,
    });
  }
}

export function checkWinningNumbersRange(numbers) {
  return numbers.every(checkWinningNumberRange);
}

export function checkWinningNumbersFormat(winningNumber) {
  if (!REGEXP.ONLY_NUMBERS_WITH_COMMA.test(winningNumber)) {
    throw new CustomError({ code: ERROR_CODE.INVALID_FORMAT }, winningNumber);
  }
}

export function checkBonusNumberFormat(bonusNumber) {
  if (!REGEXP.ONLY_NUMBER.test(bonusNumber) || checkWinningNumberRange(bonusNumber)) {
    throw new CustomError({ code: ERROR_CODE.INVALID_FORMAT }, bonusNumber);
  }
}
