const Validator = {
  validateLottoNumberLength(lottoNumber) {
    if (lottoNumber.length !== 6)
      throw new Error("[ERROR] 로또 번호는 6자리로 입력해야 합니다.");
  },

  validateLottoNumberDuplicated(lottoNumber) {
    if (lottoNumber.length !== new Set(lottoNumber).size)
      throw new Error(
        "[ERROR] 로또 번호는 서로 중복되지 않는 값이어야 합니다."
      );
  },

  validateLottoNumberRange(lottoNumber) {
    lottoNumber.forEach((number) => {
      if (number < 1 || number > 45)
        throw new Error("[ERROR] 로또 번호는 1~45 사이의 숫자여야 합니다.");
    });
  },

  validateBonusNumberDuplicated(lottoNumber, bonusNumber) {
    if (lottoNumber.includes(bonusNumber))
      throw new Error(
        "[ERROR] 보너스 번호는 로또 번호와 중복되지 않아야 합니다."
      );
  },

  validateBonusNumberRange(bonusNumber) {
    if (bonusNumber < 1 || bonusNumber > 45)
      throw new Error("[ERROR] 보너스 번호는 1~45 사이의 숫자여야 합니다.");
  },

  validateNumberType(input) {
    if (Number.isNaN(Number(input)))
      throw new Error("[ERROR] 입력 값은 숫자여야 합니다.");
  },

  validateExactUnit(input, unit) {
    if (input % unit !== 0)
      throw new Error(`[ERROR] 입력 값은 ${unit} 단위여야 합니다.`);
  },

  validateRetryCommand(command) {
    const trimedCommand = command.trim().toLowerCase();
    if (trimedCommand !== "y" && trimedCommand !== "n")
      throw new Error("[ERROR] y, n중에 명령어를 입력해야 합니다.");
  },
};

export default Validator;
