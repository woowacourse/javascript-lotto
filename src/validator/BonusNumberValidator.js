const bonusNumberValidator = {
  validateDuplication(numbers, bonusNumber) {
    if (numbers.includes(bonusNumber)) {
      throw new Error("[ERROR]");
    }
  },
};
export default bonusNumberValidator;
