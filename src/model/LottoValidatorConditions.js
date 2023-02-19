import { VALUES, REGEX } from '../constants/values';

class LottoValidatorConditions {
  static isPositiveInteger(number) {
    return REGEX.POSITIVE_INTEGER.test(number);
  }

  static isDividedByPrice(number) {
    return !(number % VALUES.LOTTO_PRICE);
  }

  static isInRange(number) {
    return number >= VALUES.LOWER_BOUND && number <= VALUES.UPPER_BOUND;
  }

  static hasNoBlank(splitedWinningNumber) {
    return !splitedWinningNumber.includes(' ');
  }

  static isYorN(restartOrNot) {
    return restartOrNot === VALUES.YES || restartOrNot === VALUES.NO;
  }

  static isNotOverlap(winningNumber) {
    return new Set(winningNumber).size === winningNumber.length;
  }

  static isSixLength(winningNumber) {
    return winningNumber.length === VALUES.LOTTO_LENGTH;
  }

  static isBonusNumInWinningNum(winningNumber, number) {
    return !winningNumber.includes(+number);
  }
}

export default LottoValidatorConditions;
