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

  throwErrorIfWinningLottoInvalid(winningLotto) {
    const isWinningLottoValid = /^(([1-9]|[1-3]\d|4[0-5]),){5}([1-9]|[1-3]\d|4[0-5])$/;

    if (!isWinningLottoValid.test(winningLotto)) {
      throw new Error('[ERROR] 로또는 콤마(,)로 구분되는 6개의 1 이상 45 이하의 정수여야 합니다.');
    }
  },

  throwErrorIfHaveDuplicates(winningLotto) {
    const numbers = winningLotto.split(',');
    const haveDuplicates = numbers.length !== new Set(numbers).size;

    if (haveDuplicates) {
      throw new Error('[ERROR] 로또 번호는 중복되는 수가 없어야 합니다');
    }
  },
};

export default validator;
