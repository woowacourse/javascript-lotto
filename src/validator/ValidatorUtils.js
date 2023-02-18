import { values, regex } from '../constants/values';

const ValidatorUtils = {
  isPositiveInteger(number) {
    return regex.POSITIVE_INTEGER.test(number);
  },

  isThousandsOfWon(number) {
    return !(number % values.LOTTO_PRICE);
  },

  isInRange(number) {
    return number >= values.LOWER_BOUND && number <= values.UPPER_BOUND;
  },

  hasNoBlank(splitedWinningNumber) {
    return !splitedWinningNumber.includes(' ');
  },

  isYorN(restartOrNot) {
    return restartOrNot === values.YES || restartOrNot === values.NO;
  },
};

export default ValidatorUtils;
