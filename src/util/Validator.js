const Validator = {
  isBase10(value) {
    return !!parseInt(value, 10);
  },

  isArrayLengthEqual(array, size) {
    return array.length === size;
  },

  isNumberInRange(min, max) {
    return (value) => (Number(value) >= min && Number(value) < max);
  },

  hasDuplication(array) {
    return array.length !== new Set(array).size;
  },

  isSame(string, target) {
    return string.toLowerCase() === target.toLowerCase();
  },
};

export default Validator;
