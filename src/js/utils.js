import { CONDITIONS, ERROR_MESSAGE } from './constants/constants';

export const validator = {
  isInputValid(input) {
    if (!this.isMoneyPositive(input)) {
      throw new Error(ERROR_MESSAGE.NEGATIVE_INPUT);
    }
    if (!this.isMoneyInteger(input)) {
      throw new Error(ERROR_MESSAGE.NOT_INTEGER_INPUT);
    }
    if (this.isMoneyTooBig(input)) {
      throw new Error(ERROR_MESSAGE.TOO_BIG_INPUT);
    }
    if (this.isMoneyTooSmall(input)) {
      throw new Error(ERROR_MESSAGE.TOO_SMALL_INPUT);
    }
  },

  isMoneyPositive(input) {
    return input > 0;
  },

  isMoneyInteger(input) {
    return Number.isInteger(input);
  },

  isMoneyTooBig(input) {
    return input >= CONDITIONS.LOTTO_PRICE * 100;
  },

  isMoneyTooSmall(input) {
    return input < CONDITIONS.LOTTO_PRICE;
  },
};
export const getValues = {
  randomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  },
};
