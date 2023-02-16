const Validation = {
  REGEX_NUMERIC: /^\d+$/,

  validateMoney(number) {
    if (!Validation.REGEX_NUMERIC.test(number) || number < 0) {
      throw new Error('로또 구매 금액은 0 이상의 정수를 입력해야 한다.');
    }
  },

  validateDistinctNumbers(lottoNumbers) {
    const lottoSet = new Set(lottoNumbers);
    if (lottoNumbers.length !== lottoSet.size) {
      throw new Error('로또 번호는 중복될 수 없습니다.');
    }
  },

  validateNumberArray(lottoNumbers) {
    lottoNumbers.forEach((lottoNumber) => {
      if (!Validation.REGEX_NUMERIC.test(lottoNumber)) {
        throw new Error('로또 번호는 정수여야 합니다.');
      }
    });
  },

  validateNumbersRange(lottoNumbers) {
    lottoNumbers.forEach((lottoNumber) => Validation.validateNumberRange(lottoNumber));
  },

  validateNumberRange(lottoNumber) {
    if (lottoNumber < 1 || lottoNumber > 45) {
      throw new Error('로또 번호는 1에서 45 사이의 숫자여야 합니다.');
    }
  },

  validateBonusNumberDistinct(lottoNumbers, bonusNumber) {
    if (lottoNumbers.includes(bonusNumber)) {
      throw new Error('로또 번호와 보너스 번호는 중복될 수 없습니다.');
    }
  },

  validateRestartCommand(command) {
    const commands = ['y', 'n'];
    if (!commands.includes(command)) {
      throw new Error('재시작 명령어는 y또는 n으로 입력해야 합니다.');
    }
  },
};

export default Validation;
