const numberValidator = {
  validate(number) {
    this.validateBlank(number);
    this.validateNumber(number);
  },

  validateBlank(number) {
    if (number.trim().length === 0) {
      throw new Error('[ERROR] 숫자로 입력해주세요.');
    }
  },

  validateNumber(number) {
    if (isNaN(number)) {
      throw new Error('[ERROR] 숫자로 입력해주세요.');
    }
  },
};

export default numberValidator;
