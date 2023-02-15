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
};

export default Validator;
