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
