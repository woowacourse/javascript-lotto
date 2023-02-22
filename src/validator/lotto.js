import { LOTTO, REGEXP, ERROR } from '../constant/constants.js';

export function checkWinningNumberRange(number) {
  if (number < LOTTO.MIN_NUMBER || number > LOTTO.MAX_NUMBER) {
    throw new Error(ERROR.INVALID_NUMBER_RANGE(LOTTO.MIN_NUMBER, LOTTO.MAX_NUMBER));
  }
}

export function checkWinningNumbersRange(numbers) {
  return numbers.every(checkWinningNumberRange);
}

export function checkWinningNumbersFormat(winningNumber) {
  if (!REGEXP.ONLY_NUMBERS_WITH_COMMA.test(winningNumber)) {
    throw new Error(ERROR.INVALID_FORMAT);
  }
}

export function checkBonusNumberFormat(bonusNumber) {
  if (!REGEXP.ONLY_NUMBER.test(bonusNumber) || checkWinningNumberRange(bonusNumber)) {
    throw new Error(ERROR.INVALID_FORMAT);
  }
}
