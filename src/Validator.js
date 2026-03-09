import { ERROR_MESSAGE } from "./constants.js";
import { getErrorMessage } from "./Utils.js";

const Validator = {
  validateNotEmptyString(string) {
    if (string.trim() === "") {
      throw new Error(getErrorMessage(ERROR_MESSAGE.EMPTY_STRING));
    }
  },

  validatePositiveNumber(number) {
    if (number <= 0) {
      throw new Error(getErrorMessage(ERROR_MESSAGE.NOT_POSITIVE_NUMBER));
    }
  },

  validateNumberUpper(upper, number) {
    if (number > upper) {
      throw new Error(getErrorMessage(ERROR_MESSAGE.OVER_UPPER));
    }
  },

  validateNumberLower(lower, number) {
    if (number < lower) {
      throw new Error(getErrorMessage(ERROR_MESSAGE.UNDER_LOWER));
    }
  },

  validateStringIsNumber(string) {
    const parsedNumber = Number(string);

    if (Number.isNaN(parsedNumber)) {
      throw new Error(getErrorMessage(ERROR_MESSAGE.NOT_NUMBER));
    }
  },

  validateNumberDivided(number, divideNumber) {
    if (number % divideNumber !== 0) {
      throw new Error(getErrorMessage(ERROR_MESSAGE.NOT_DIVIDED));
    }
  },

  validateNotDuplicated(array) {
    if (array.length !== new Set(array).size) {
      throw new Error(getErrorMessage(ERROR_MESSAGE.DUPLICATED));
    }
  },

  validateArrayLength(array, length) {
    if (array.length !== length) {
      throw new Error(getErrorMessage(ERROR_MESSAGE.INVALID_ARRAY_LENGTH));
    }
  },

  validateIncludeElement(targetElement, array) {
    if (!array.includes(targetElement))
      throw new Error(getErrorMessage(ERROR_MESSAGE.NOT_INCLUDED));
  },
};

export default Validator;
