import { LOTTO } from '../../constants.js';

const isNumberOutOfRange = (number) => {
  return !(LOTTO.MIN_NUMBER <= number && number <= LOTTO.MAX_NUMBER);
};

const validator = {
  isChangeMoneyExist(cost) {
    return cost % LOTTO.PRICE !== 0;
  },

  isMoneyLessThanMinCost(cost) {
    return cost < LOTTO.PRICE;
  },

  isDuplicatedNumberExist(numbers) {
    return new Set(numbers).size !== numbers.length;
  },

  isNumberOutOfRangeExist(numbers) {
    return numbers.some((number) => isNumberOutOfRange(number));
  },

  isEmptyCorrectNumberExist(numbers) {
    return numbers.length < LOTTO.CORRECT_NUMBER_LENGTH;
  },
};

export default validator;
