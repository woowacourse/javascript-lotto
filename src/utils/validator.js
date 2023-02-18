import REGEXP from '../constants/regexp.js';

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
    return numbers.every(number => this.isValidRangeNumber(number, { min, max }));
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

  isOverlap(targetNumbers, number) {
    return targetNumbers.includes(number);
  },

  isValidCommand(command) {
    return command === 'y' || command === 'n';
  },
};

export default validator;
