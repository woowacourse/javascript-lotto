const validator = {
  checkDigit(input) {
    if (!/^[1-9]{1}[0-9]{0,}$/.test(input)) throw new Error();
  },

  checkGreaterThanOrEqualMin(number, min) {
    if (number < min) throw new Error();
  },

  checkLessThanOrEqualMax(number, max) {
    if (number > max) throw new Error();
  },

  checkDivideIntoUnit(number, unit) {
    if (number % unit !== 0) throw new Error();
  },

  checkDuplication(array) {
    if (new Set(array).size !== array.length) throw new Error();
  },

  checkArrayLength(array, length) {
    if (array.length !== length) throw new Error();
  },
};

export default validator;
