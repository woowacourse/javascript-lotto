import { ERROR_MESSAGE } from './constants/constants';

export const validator = {
  isInputValid(input) {
    if (!this.isMoneyPositive(input)) {
      throw new Error(ERROR_MESSAGE.NEGATIVE_INPUT_ERROR);
    }
    if (!this.isMoneyInteger(input)) {
      throw new Error(ERROR_MESSAGE.NOT_INTEGER_INPUT_ERROR);
    }

    if (!this.isMoneyMultiplesOfThousand(input)) {
      throw new Error(ERROR_MESSAGE.NOT_MUTIPLE_THOUSAND);
    }
  },

  isMoneyPositive(input) {
    return input > 0;
  },

  isMoneyInteger(input) {
    return Number.isInteger(input);
  },

  isMoneyMultiplesOfThousand(input) {
    return input % 1000 === 0;
  },
};

export const getValues = {
  randomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  },
};
