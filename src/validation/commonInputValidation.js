import ERROR_MESSAGE from "../constants/errorMessage.js";

const commonInputValidation = {
  categories: {
    notEmpty: {
      errorMessage: ERROR_MESSAGE.NOT_EMPTY,
      isValid(input) {
        return input !== "";
      },
    },

    withoutSpaces: {
      errorMessage: ERROR_MESSAGE.NOT_INCLUDED_WHITESPACE,
      isValid(input) {
        return !input.includes(" ");
      },
    },
  },
};

export default commonInputValidation;
