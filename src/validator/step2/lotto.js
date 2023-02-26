import { ONLY_NUMBER, ONLY_NUMBERS_WITH_COMMA } from '../../constants/regExp.js';
import { LOTTO } from '../../constants/values.js';
import { CustomError, ERROR_CODE } from '../../utils/Error.js';

export function checkDrawingNumberRange(number) {
  if (number < LOTTO.LOTTO_MIN_NUMBER || number > LOTTO.LOTTO_MAX_NUMBER) {
    throw new CustomError({
      code: ERROR_CODE.INVALID_NUMBER_RANGE,
      payload: { min: LOTTO.LOTTO_MIN_NUMBER, max: LOTTO.LOTTO_MAX_NUMBER },
      number,
    });
  }

  return true;
}

export function checkWinNumbersFormat(winNumbers) {
  if (!ONLY_NUMBERS_WITH_COMMA.test(winNumbers)) {
    throw new CustomError({ code: ERROR_CODE.INVALID_FORMAT }, winNumbers);
  }

  return true;
}

export function checkDrawingNumbersRange(numbers) {
  return numbers.every(checkDrawingNumberRange);
}

export function checkBonusNumberFormat(bonusNumber) {
  if (!ONLY_NUMBER.test(bonusNumber) && checkDrawingNumberRange(bonusNumber)) {
    throw new CustomError({ code: ERROR_CODE.INVALID_FORMAT }, bonusNumber);
  }
}

export function checkDrawingNumbersFormat({ winNumbers, bonusNumber }) {
  if (new Set(winNumbers).size !== winNumbers.length || winNumbers.includes(bonusNumber)) {
    throw new CustomError({ code: ERROR_CODE.DUPLICATED_NUMBER }, { winNumbers, bonusNumber });
  }

  return true;
}
