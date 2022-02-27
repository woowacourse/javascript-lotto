import { ERROR_MESSAGE } from './constants/constants';

export const validator = {
  isInputValid(input) {
    if (!this.isMoneyPositive(input)) {
      throw new Error(ERROR_MESSAGE.NEGATIVE_INPUT_ERROR);
    }
    if (!this.isMoneyInteger(input)) {
      throw new Error(ERROR_MESSAGE.NOT_INTEGER_INPUT_ERROR);
    }
    if (!this.isMoneyTooBig(input)) {
      throw new Error(ERROR_MESSAGE.NOT_AVAILABLE_MONEY);
    }
  },

  isMoneyPositive(input) {
    return input > 0;
  },

  isMoneyInteger(input) {
    return Number.isInteger(input);
  },

  isMoneyTooBig(input) {
    return input < 100000;
  },
};

export const getValues = {
  randomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  },
};
