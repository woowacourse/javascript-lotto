const Validator = {
  checkArrayLengthSame(array, count) {
    return array.length === count;
  },

  checkArrayNotEmpty(array) {
    return array.length !== 0;
  },

  checkArrayElementType(array, type) {
    return array.every((element) => typeof element === type);
  },

  checkIsNotNaN(array) {
    return array.every((element) => !Number.isNaN(element));
  },

  checkArrayElementInteger(array) {
    return array.every((element) => Number.isInteger(element));
  },

  checkIsArray(array) {
    return Array.isArray(array);
  },

  checkArrayElementArray(array) {
    return array.every((element) => Array.isArray(element));
  },

  checkRangeNumbers(numbers, min, max) {
    return numbers.every((number) => min <= number && number <= max);
  },

  checkIsUnique(array) {
    return new Set(array).size === array.length;
  },

  checkNumberNotInArray(array, number) {
    return !array.includes(number);
  },

  checkIsDivisible(number, divisor) {
    return number % divisor === 0;
  },
};

export default Validator;
