import { LOTTO_PRICE, MAX_NUMBER, MIN_NUMBER } from '../constants.js';

const isNumberOutOfRange = (number) => {
  return !(MIN_NUMBER <= number && number <= MAX_NUMBER);
};

export default {
  isChangeMoneyExist(cost) {
    return cost % LOTTO_PRICE !== 0;
  },

  isMoneyLessThanMinCost(cost) {
    return cost < LOTTO_PRICE;
  },

  isDuplicatedNumberExist(numbers) {
    return new Set(numbers).size !== numbers.length;
  },

  isNumberOutOfRangeExist(numbers) {
    return numbers.some((number) => isNumberOutOfRange(number));
  },
};
