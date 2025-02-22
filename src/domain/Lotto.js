import LottoValidator from "../validation/LottoValidator.js";

class Lotto {
  #numbers;

  constructor(numbers) {
    this.#numbers = this.sortLottoNumber(numbers);
    this.validate(this.#numbers);
  }

  validate(numbers) {
    const validator = new LottoValidator();
    validator.validateLotto(numbers);
  }

  sortLottoNumber(numbers) {
    const arr = [...numbers];
    return arr.sort((a, b) => a - b);
  }

  getLottoNumbers() {
    return this.#numbers;
  }

  getSameNumbersLength(givenLottoNumber) {
    return this.#numbers.filter((number) => givenLottoNumber.includes(number))
      .length;
  }

  hasNumber(number) {
    return this.#numbers.includes(number);
  }
}

export default Lotto;
