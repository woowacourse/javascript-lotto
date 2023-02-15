const validator = {
  throwErrorIfNotDecimal(number) {
    if (!/^[1-9]+\d*/.test(number)) {
      throw new Error('[ERROR] 구입 금액은 정수여야 합니다.');
    }
  },

  throwErrorIfNotDivisiable(number, divisor) {
    const isDivisiableByDivisor = Boolean(number % divisor) === false;

    if (!isDivisiableByDivisor) {
      throw new Error(`[ERROR] 구입 금액은 ${divisor}원 단위여야 합니다`);
    }
  },
};

export default validator;
