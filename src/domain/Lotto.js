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
    return numbers.sort((a, b) => a - b);
  }

  getLottoNumbers() {
    return this.#numbers;
  }
}

export default Lotto;
