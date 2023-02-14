const Validator = {
  isInteger(number) {
    return Number.isInteger(number);
  },

  isDuplicated(numbers) {
    return new Set(numbers).size !== numbers.length;
  },
};

export default Validator;
