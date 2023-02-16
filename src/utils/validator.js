const validator = {
  checkDigit(string) {
    if (!/^[1-9]{1}[0-9]{0,}$/.test(string)) throw new Error('오류1');
  },

  checkGreaterThanOrEqualMin(number, min) {
    if (number < min) throw new Error('오류2');
  },

  checkLessThanOrEqualMax(number, max) {
    if (number > max) throw new Error('오류3');
  },

  checkDivideIntoUnit(number, unit) {
    if (number % unit !== 0) throw new Error();
  },

  checkDuplication(array) {
    if (new Set(array).size !== array.length) throw new Error('오류4');
  },

  checkArrayLength(array, length) {
    if (array.length !== length) throw new Error();
  },
};

export default validator;
