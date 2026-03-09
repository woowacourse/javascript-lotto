import { ERROR_MESSAGE } from "./constants.js";

const Validator = {
  validateNotEmptyString(string) {
    if (string.trim() === "") {
      throw new Error(ERROR_MESSAGE.PREFIX);
    }
  },

  validatePositiveNumber(number) {
    if (number <= 0) {
      throw new Error(ERROR_MESSAGE.PREFIX);
    }
  },

  validateNumberUpper(upper, number) {
    if (number > upper) {
      throw new Error(ERROR_MESSAGE.PREFIX);
    }
  },

  validateNumberLower(lower, number) {
    if (number < lower) {
      throw new Error(ERROR_MESSAGE.PREFIX);
    }
  },

  validateStringIsNumber(string) {
    const parsedNumber = Number(string);

    if (Number.isNaN(parsedNumber)) {
      throw new Error(ERROR_MESSAGE.PREFIX);
    }
  },

  validateNumberDivided(number, divideNumber) {
    if (number % divideNumber !== 0) {
      throw new Error(ERROR_MESSAGE.PREFIX);
    }
  },

  validateNotDuplicated(array) {
    if (array.length !== new Set(array).size) {
      throw new Error(ERROR_MESSAGE.PREFIX);
    }
  },

  validateArrayLength(array, length) {
    if (array.length !== length) {
      throw new Error(ERROR_MESSAGE.PREFIX);
    }
  },
};

export default Validator;
