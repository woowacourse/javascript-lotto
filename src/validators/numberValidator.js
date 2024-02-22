const numberValidator = {
  validate(number) {
    this.validateBlank(number);
    this.validateNumber(number);
  },

  validateBlank(number) {
    if (number.length === 0) {
      throw new Error('[ERROR] 숫자로 입력해주세요.');
    }
  },

  validateNumber(number) {
    if (isNaN(number)) {
      throw new Error('[ERROR] 숫자로 입력해주세요.');
    }
  },

  validateRange(number) {
    if (!this.isValidRange(number)) {
      throw new Error('[ERROR] 1부터 45 사이의 값으로 입력해주세요.');
    }
  },

  isValidRange(number) {
    return number >= 1 && number <= 45;
  },
};

export default numberValidator;
