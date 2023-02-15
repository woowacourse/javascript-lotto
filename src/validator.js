const validator = {
  checkDigit(input) {
    if (!/^[1-9]{1}[0-9]{0,}$/.test(input)) {
      throw new Error();
    }
  },
};

export default validator;
