import { ERROR_MESSAGE } from '../constants/message';

const numberValidator = {
  validate(number) {
    this.validateBlank(number);
    this.validateNumber(number);
  },

  validateBlank(number) {
    if (number.length === 0) {
      throw new Error(ERROR_MESSAGE.BLANK_INPUT);
    }
  },

  validateNumber(number) {
    if (isNaN(number)) {
      throw new Error(ERROR_MESSAGE.NOT_A_NUMBER_INPUT);
    }
  },

  validateRange(number) {
    if (!this.isValidRange(number)) {
      throw new Error(ERROR_MESSAGE.OUT_OF_RANGE);
    }
  },

  isValidRange(number) {
    return number >= 1 && number <= 45;
  },
};

export default numberValidator;
