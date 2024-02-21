import ERROR_MESSAGE from "../constants/errorMessage.js";
import { LOTTO_SETTING } from "../constants/lottoConstants.js";

const budgetValidation = {
  categories: {
    typeIsInteger: {
      errorMessage: ERROR_MESSAGE.INTEGER_ONLY,
      isValid(input) {
        return !Number.isNaN(input) && Number.isInteger(input);
      },
    },

    outOfRange: {
<<<<<<< HEAD
      errorMessage: ERROR_MESSAGE.BUDGET_RANGE,
      isValid(input) {
        return input >= LOTTO_SETTING.PRICE && input <= LOTTO_SETTING.MAX_PRICE;
=======
      errorMessage: ERROR_MESSAGE.outOfRange,
      isValid(input) {
        return input >= 1000 && input <= 100000;
>>>>>>> e57b0b7 (feat: 로또 구입 금액 입력 구현)
      },
    },

    divisibleByMinimumPrice: {
<<<<<<< HEAD
      errorMessage: ERROR_MESSAGE.DIVISIBLE_BY_MIN_PRICE,
      isValid(input) {
        return input % LOTTO_SETTING.PRICE === 0;
=======
      errorMessage: ERROR_MESSAGE.divisibleByMinimumPrice,
      isValid(input) {
        return input % 1000 === 0;
>>>>>>> e57b0b7 (feat: 로또 구입 금액 입력 구현)
      },
    },
  },
};

<<<<<<< HEAD
export default budgetValidation;
=======
export default BudgetValidation;
>>>>>>> e57b0b7 (feat: 로또 구입 금액 입력 구현)
