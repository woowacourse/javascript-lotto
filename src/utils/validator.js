import { LOTTO } from '../constants.js';

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

  isMoneyMoreThanZero(cost) {
    return cost > 0;
  },

  isInteger(cost) {
    return Number.isInteger(cost);
  },

  isArrayWithContent(array) {
    if (!Array.isArray(array) || array.length === 0) {
      return false;
    };

    return true;
  },

  isDuplicatedNumberExist(numbers) {
    if (validator.isArrayWithContent(numbers)) {
      return
    }

    return new Set(numbers).size !== numbers.length;
  },

  isNumberOutOfRangeExist(numbers) {
    if (validator.isArrayWithContent(numbers)) {
      return
    }

    return numbers.some((number) => isNumberOutOfRange(number));
  },

  isEmptyCorrectNumberExist(numbers) {
    if (validator.isArrayWithContent(numbers)) {
      return
    }

    return numbers.length < LOTTO.CORRECT_NUMBER_LENGTH;
  },
};

export default validator;
