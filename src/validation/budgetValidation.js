import ERROR_MESSAGE from "../constants/errorMessage.js";

const budgetValidation = {
  categories: {
    typeIsInteger: {
      errorMessage: ERROR_MESSAGE.typeIsInteger,
      isValid(input) {
        return !Number.isNaN(input) && Number.isInteger(input);
      },
    },

    outOfRange: {
      errorMessage: ERROR_MESSAGE.outOfRangeBudget,
      isValid(input) {
        return input >= 1000 && input <= 100000;
      },
    },

    divisibleByMinimumPrice: {
      errorMessage: ERROR_MESSAGE.divisibleByMinimumPrice,
      isValid(input) {
        return input % 1000 === 0;
      },
    },
  },
};

export default budgetValidation;
