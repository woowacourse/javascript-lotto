import ERROR_MESSAGE from "../constants/error-messages";
import SYMBOL from "../constants/symbol";
import AppError from "../utils/Error.js";

const { EMPTY_INPUT, SPACE_IN_INPUT, INCLUDES_EMPTY_INPUT } = ERROR_MESSAGE;

const CommonValidator = {
  validateEmpty(input) {
    const isEmptyString = typeof input === "string" && input === SYMBOL.BLANK;
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
    console.log("input", input);
    this.validateEmpty(input);
    this.validateExistSpace(input);
  },
};

export default CommonValidator;
