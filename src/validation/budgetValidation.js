import ERROR_MESSAGE from "../constants/errorMessage.js";

const budgetValidation = {
  categories: {
    typeIsInteger: {
      errorMessage: ERROR_MESSAGE.INTEGER_ONLY,
      isValid(input) {
        return !Number.isNaN(input) && Number.isInteger(input);
      },
    },

    outOfRange: {
      errorMessage: ERROR_MESSAGE.BUDGET_RANGE,
      isValid(input) {
        return input >= 1000 && input <= 100000;
      },
    },

    divisibleByMinimumPrice: {
      errorMessage: ERROR_MESSAGE.DIVISIBLE_BY_MIN_PRICE,
      isValid(input) {
        return input % 1000 === 0;
      },
    },
  },
};

export default budgetValidation;
