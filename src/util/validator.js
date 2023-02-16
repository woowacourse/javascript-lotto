import REGEXP from '../constant/regexp.js';

const validator = {
  isFirstLetterNotZero(input) {
    return input.charAt(0) !== '0';
  },

  isNumericString(input) {
    return REGEXP.NUMERIC.test(input);
  },

  canDivide(target, divider) {
    return target % divider === 0;
  },

  isValidFormat(string) {
    return REGEXP.NUMBER_COMMA_SPACE.test(string);
  },

  isValidRangeNumbers(numbers, { min, max }) {
    return numbers.every(number => number >= min && number <= max);
  },

  isValidRangeNumber(number, { min, max }) {
    return number >= min && number <= max;
  },

  isValidSize(numbers, size) {
    return numbers.length === size;
  },

  isUnique(numbers) {
    const numbersSet = new Set(numbers);

    return numbers.length === numbersSet.size;
  },
};

export default validator;
