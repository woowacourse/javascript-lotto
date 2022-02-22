function isValidLength(lottoNumber) {
  return lottoNumber.length === 6;
}

function isValidNumber(lottoNumber) {
  return lottoNumber.every((number) => {
    if (Number.isInteger(number)) {
      return number >= 1 && number <= 45;
    }
    return false;
  });
}

class Lotto {
  constructor(lottoNumber) {
    this.lottoNumber = lottoNumber;
  }

  static create(lottoNumber) {
    if (isValidNumber(lottoNumber) && isValidLength(lottoNumber)) {
      return new Lotto(lottoNumber);
    }
    throw new Error("잘못된 입력 값");
  }

  lottoScore(winNumber) {}
}

export default Lotto;
