const Validator = {
  validateLottoNumberLength(lottoNumber) {
    if (lottoNumber.length !== 6)
      throw new Error("[ERROR] 로또 번호는 6자리로 입력해야 합니다.");
  },

  validateLottoNumberDuplicate(lottoNumber) {
    if (lottoNumber.length !== [...new Set(lottoNumber)])
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
};

export default Validator;
