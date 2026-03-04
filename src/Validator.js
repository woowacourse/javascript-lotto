class Validator {
  validatePrice(price) {
    if (isNaN(price)) {
      throw new Error("가격 예외 발생");
    }
    if (price % 1000 !== 0 || price <= 0) {
      throw new Error("가격 예외 발생");
    }
  }
  validateLottoNumber(number) {
    if (number < 1 || number > 45) throw new Error("번호 예외 발생");
    if (!Number.isInteger(number)) throw new Error("번호 예외 발생");
    if (isNaN(number)) throw new Error("번호 예외 발생");
  }
  validateLottoNumbers(numbers) {
    if (numbers.length !== 6) {
      throw new Error("번호 예외 발생");
    }

    const set = new Set(numbers);

    if (set.size !== numbers.length) {
      throw new Error("번호 예외 발생");
    }

    numbers.forEach((number) => {
      this.validateLottoNumber(number);
    });
  }

  validateBonusNumber(lottoNumbers, bonusNumber) {
    this.validateLottoNumber(bonusNumber);
    if (lottoNumbers.includes(bonusNumber)) throw new Error("번호 예외 발생");
  }
}

export default Validator;
