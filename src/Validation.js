const Validation = {
  REGEX_NUMERIC: /^\d+$/,

  isNumeric(text) {
    return Validation.REGEX_NUMERIC.test(text);
  },

  isInRange(number) {
    return number >= 1 && number <= 45;
  },

  validateMoney(money) {
    if (!Validation.isNumeric(money) || money < 0) {
      throw new Error('로또 구매 금액은 0 이상의 정수를 입력해야 합니다.');
    }
    if (money % 1000 !== 0 || money / 1000 <= 0) {
      throw new Error('1000원 단위로 금액을 주어야 합니다.');
    }
  },

  validateLottoNumber(lottoNumber) {
    if (!Validation.isNumeric(lottoNumber)) {
      throw new Error('로또 번호는 숫자로 이루어져 있어야 합니다.');
    }
    if (!Validation.isInRange(lottoNumber)) {
      throw new Error('로또 번호는 1에서 45 사이의 숫자여야 합니다.');
    }
  },

  validateLottoNumbers(lottoNumbers) {
    Validation.validateIsArray(lottoNumbers);
    Validation.validateArrayLength(lottoNumbers);
    Validation.validateUniqueNumbers(lottoNumbers);

    lottoNumbers.forEach(Validation.validateLottoNumber);
  },

  validateIsArray(lottoNumbers) {
    if (!Array.isArray(lottoNumbers)) {
      throw new Error('로또 번호는 배열 타입이어야 합니다.');
    }
  },

  validateArrayLength(lottoNumbers) {
    if (lottoNumbers.length !== 6) {
      throw new Error('로또 번호는 6자리여야 합니다.');
    }
  },

  validateUniqueNumbers(lottoNumbers) {
    const lottoSet = new Set(lottoNumbers);
    if (lottoNumbers.length !== lottoSet.size) {
      throw new Error('로또 번호는 중복될 수 없습니다.');
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
