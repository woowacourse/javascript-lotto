import { ERROR_MESSAGE } from './constants/constants';

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
    return true;
  },

  isMoneyPositive(input) {
    return input > 0;
  },

  isMoneyInteger(input) {
    return Number.isInteger(input);
  },
};

export const getValues = {
  randomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  },
};
