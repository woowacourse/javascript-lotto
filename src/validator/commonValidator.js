import ERROR_MESSAGE from '../constants/error-messages.js';
import SYMBOL from '../constants/symbol.js';
import AppError from '../utils/appError.js';

const { EMPTY_INPUT, SPACE_IN_INPUT, INCLUDES_EMPTY_INPUT } = ERROR_MESSAGE;

const commonValidator = {
  validateEmpty(input) {
    const isEmptyString = typeof input === 'string' && input === SYMBOL.BLANK;
    const isEmptyArray = Array.isArray(input) && input.includes(SYMBOL.BLANK);

    if (isEmptyString) {
      throw new AppError(EMPTY_INPUT);
    }

    if (isEmptyArray) {
      throw new AppError(INCLUDES_EMPTY_INPUT);
    }
  },

  validateExistSpace(input) {
    if (input.includes(SYMBOL.SPACE)) {
      throw new AppError(SPACE_IN_INPUT);
    }
  },

  validate(input) {
    this.validateEmpty(input);
    this.validateExistSpace(input);
  },
};

export default commonValidator;
