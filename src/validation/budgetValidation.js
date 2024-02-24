import { LOTTO_SETTING } from "../constants/lottoConstants.js";
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
        return input >= LOTTO_SETTING.PRICE && input <= LOTTO_SETTING.MAX_PRICE;
      },
    },

    divisibleByMinimumPrice: {
      errorMessage: ERROR_MESSAGE.DIVISIBLE_BY_MIN_PRICE,
      isValid(input) {
        return input % LOTTO_SETTING.PRICE === 0;
      },
    },
  },
};

export default budgetValidation;
