const validator = {
  checkDigit(input) {
    if (!/^[1-9]{1}[0-9]{0,}$/.test(input)) {
      throw new Error();
    }
  },

  checkGreaterThanOrEqualMin(input, min) {
    if (input < min) throw new Error();
  },

  checkLessThanOrEqualMax(input, max) {
    if (input > max) throw new Error();
  },

  checkDivideIntoUnit(input, unit) {
    if (input % unit !== 0) throw new Error();
  },
};

export default validator;
