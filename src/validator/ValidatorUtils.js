import { values, regex } from '../constants/values';

const validatorUtils = {
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

  yOrN(restartInput) {
    return regex.Y_OR_N.test(restartInput);
  },
};

export default validatorUtils;
