import { LOTTO_PRICE } from "../constants/systemConstants.js";

const validationCondition = {
  isNumber(input) {
    return !isNaN(input);
  },
  isEmpty(input) {
    return input === "" || input.length === 0;
  },
  isUnder(input) {
    return Number(input) < LOTTO_PRICE;
  },
  isDivisible(input) {
    return Number(input) / LOTTO_PRICE === 0;
  },
};

export default validationCondition;
