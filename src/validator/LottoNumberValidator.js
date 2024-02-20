const lottoNumberValidator = {
  validateNumbersLength(numbers) {
    if (numbers.length !== 6) {
      throw new Error("[ERROR] 로또 번호로 6개를 입력해주세요.");
    }
  },

  validateDuplicate(numbers) {
    if (new Set(numbers).size !== 6) {
      throw new Error("[ERROR] 로또 번호에 중복된 숫자가 있습니다.ㄴ");
    }
  },

  validateRange(numbers) {
    if (numbers.filter((number) => number < 1 || number > 45)) {
      throw new Error("[ERROR] 로또 번호로 1 ~ 45 사이의 숫자를 입력해주세요.");
    }
  },

  validate(numbers) {
    this.validateNumbersLength(numbers);
    this.validateDuplicate(numbers);
    this.validateRange(numbers);
  },
};

export default lottoNumberValidator;
