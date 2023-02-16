const Validator = {
  isPositiveInteger(value) {
    return (!!parseInt(value, 10))
      && Number.isInteger(Number(value))
      && Number(value) > 0;
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
