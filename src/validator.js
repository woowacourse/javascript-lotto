const validator = {
  checkDigit(input) {
    if (!/^[1-9]{1}[0-9]{0,}$/.test(input)) {
      throw new Error();
    }
  },

  checkGreaterThanMin(input, min) {
    if (input < min) throw new Error();
  },

  checkLessThanMax(input, max) {
    if (input > max) throw new Error();
  },
};

export default validator;
