import { regex } from '../constants/values';

const ValidatorUtils = {
  isPositiveInteger(number) {
    return regex.POSITIVE_INTEGER.test(number);
  },

  isThousandsOfWon(number) {
    return !(number % 1000);
  },
};

export default ValidatorUtils;
