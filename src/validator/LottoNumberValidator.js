const lottoNumberValidator = {
  validateNumbersLength(numbers) {
    if (numbers.length !== 6) {
      throw new Error("[ERROR]");
    }
  },

  validateDuplicate(numbers) {
    if (new Set(numbers).size !== 6) {
      throw new Error("[ERROR]");
    }
  },

  validateRange(numbers) {
    if (numbers.filter((number) => number < 1 || number > 45)) {
      throw new Error("[ERROR]");
    }
  },
};

export default lottoNumberValidator;
