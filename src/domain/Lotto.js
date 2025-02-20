import LottoValidator from "../validation/LottoValidator.js";

class Lotto {
  constructor(numbers) {
    this.numbers = this.sortLottoNumber(numbers);
    this.validate(this.numbers);
  }

  validate(numbers) {
    const validator = new LottoValidator();
    validator.validateLotto(numbers);
  }

  sortLottoNumber(numbers) {
    return numbers.sort((a, b) => a - b);
  }

  getLottoNumbers() {
    return this.numbers;
  }

  getSameNumbers(givenLottoNumber) {
    return this.numbers.filter((number) => givenLottoNumber.includes(number))
      .length;
  }

  hasBonusNumber(bonusNumber) {
    return this.numbers.includes(bonusNumber);
  }
}

export default Lotto;
