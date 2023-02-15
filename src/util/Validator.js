const Validator = {
  isPositiveInteger(value) {
    if (Number(value) === 0) {
      return false;
    }

    return /^\+?\d+$/.test(value);
  },

  isSafeNumber(value) {
    return Number.isSafeInteger(Number(value));
  },

  isArrayLengthEqual(array, size) {
    return array.length === size;
  },

  isNumberInRange(value, min, max) {
    return value >= min && value < max;
  },

  hasDuplication(array) {
    return array.length !== new Set(array).size;
  },

  isSame(string, target) {
    return string.toLowerCase() === target.toLowerCase();
  },
};

export default Validator;
