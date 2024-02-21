import ERROR_MESSAGE from "../constants/errorMessage.js";

const commonInputValidation = {
  categories: {
    notEmpty: {
      errorMessage: ERROR_MESSAGE.notEmpty,
      isValid(input) {
        return input !== "";
      },
    },

    withoutSpaces: {
      errorMessage: ERROR_MESSAGE.withoutSpaces,
      isValid(input) {
        return !input.includes(" ");
      },
    },
  },
};

export default commonInputValidation;
