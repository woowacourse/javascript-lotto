import { LOTTO_PRICE } from "../constants/systemConstants.js";
import { LOTTO_NUMBERS } from "../constants/systemConstants.js";
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
    return Number(input) % LOTTO_PRICE === 0;
  },

  isLengthValid(numbers) {
    return numbers.length === LOTTO_NUMBERS.LENGTH;
  },
  isRangeValid(numbers) {
    return !numbers.some((number) => number < 1 || number > 45);
  },
  isDistinct(numbers) {
    return new Set(numbers).size === numbers.length;
  },
  isBonusDistinct(numbers, bonusNumber) {
    return new Set([...numbers, Number(bonusNumber)]).size !== numbers.length;
  },
  isBonusRangeValid(bonusNumber) {
    return Number(bonusNumber) <= 45 && Number(bonusNumber) >= 1;
  },
};

export default validationCondition;
