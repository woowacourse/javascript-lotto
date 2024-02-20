const LottoValidator = {
  validateNumbersLength(numbers) {
    if (numbers.length !== 6) {
      throw new Error('[ERROR] 로또 번호는 6개여야 합니다.');
    }
  },

  validateNumbersDuplicate(numbers) {
    if (new Set(numbers).size !== numbers.length) {
      throw new Error('[ERROR] 로또 번호는 중복되어선 안 됩니다.');
    }
  },

  validateNumbersType(numbers) {
    if (!numbers.every((number) => Number.isInteger(Number(number)))) {
      throw new Error('[ERROR] 로또 번호는 전부 정수여야 합니다.');
    }
  },

  validateNumbersRange(numbers) {
    if (!numbers.every((number) => number >= 1 && number <= 45)) {
      throw new Error('[ERROR] 로또 번호는 전부 1에서 45 사이의 숫자여야 합니다.');
    }
  },
};

export default LottoValidator;
