import { ERROR_MESSAGE } from './constants/constants';
import { View } from './view/View';

export const validator = {
  isInputValid(input) {
    if (!this.isMoneyPositive(input)) {
      alert(ERROR_MESSAGE.NEGATIVE_INPUT_ERROR);
      throw new Error(ERROR_MESSAGE.NEGATIVE_INPUT_ERROR);
    }
    if (!this.isMoneyInteger(input)) {
      alert(ERROR_MESSAGE.NOT_INTEGER_INPUT_ERROR);
      throw new Error(ERROR_MESSAGE.NOT_INTEGER_INPUT_ERROR);
    }

    if (!this.isMoneyMultiplesOfThousand(input)) {
      alert(ERROR_MESSAGE.NOT_MUTIPLE_THOUSAND);
      throw new Error(ERROR_MESSAGE.NOT_MUTIPLE_THOUSAND);
    }

    return true;
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
