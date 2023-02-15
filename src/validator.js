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

  checkDuplication(numbers) {
    if (new Set(numbers).size !== numbers.length) throw new Error();
  },
};

export default validator;
