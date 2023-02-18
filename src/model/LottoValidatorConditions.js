import { VALUES, REGEX } from '../constants/values';

const LottoValidatorConditions = {
  isPositiveInteger(number) {
    return REGEX.POSITIVE_INTEGER.test(number);
  },

  isDividedByPrice(number) {
    return !(number % VALUES.LOTTO_PRICE);
  },

  isInRange(number) {
    return number >= VALUES.LOWER_BOUND && number <= VALUES.UPPER_BOUND;
  },

  hasNoBlank(splitedWinningNumber) {
    return !splitedWinningNumber.includes(' ');
  },

  isYorN(restartOrNot) {
    return restartOrNot === VALUES.YES || restartOrNot === VALUES.NO;
  },

  isNotOverlap(winningNumber) {
    return new Set(winningNumber).size === winningNumber.length;
  },

  isSixLength(winningNumber) {
    return winningNumber.length === VALUES.LOTTO_LENGTH;
  },

  isBonusNumInWinningNum(winningNumber, number) {
    return !winningNumber.includes(+number);
  },
};

export default LottoValidatorConditions;
