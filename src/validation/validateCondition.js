import { LOTTO_NUMBERS } from "../lottoConstants/systemConstants";

const validationCondition = {
  isNumber(input) {
    return !isNaN(input);
  },
  isEmpty(input) {
    return input === "" || input.length === 0;
  },
  isUnder(input, threshold) {
    return Number(input) < threshold;
  },
  isDivisible(input, divisor) {
    return Number(input) % divisor === 0;
  },

  isLengthValid(numbers, length) {
    return numbers.length === length;
  },
  isRangeValid(numbers) {
    return !numbers.some((number) => number < LOTTO_NUMBERS.MIN || number > LOTTO_NUMBERS.MAX);
  },
  isDistinct(numbers) {
    return new Set(numbers).size === numbers.length;
  },
  isBonusDistinct(numbers, bonusNumber) {
    return new Set([...numbers, Number(bonusNumber)]).size !== numbers.length;
  },
  isBonusRangeValid(bonusNumber) {
    return Number(bonusNumber) <= LOTTO_NUMBERS.MAX && Number(bonusNumber) >= LOTTO_NUMBERS.MIN;
  },
};

export default validationCondition;
