import ERROR_MESSAGE from '../settings/ErrorMessage.js';
class Lotto {
  #numbers;

  constructor(numbers) {
    this.#lottoValidation(numbers);
    this.#numbers = numbers;
  }
  #lottoValidation(numbers) {
    if (numbers.length !== 6) throw new Error(ERROR_MESSAGE.notSixNumbers);
    if (numbers.length !== new Set(numbers).size)
      throw new Error(ERROR_MESSAGE.duplicatedNumbers);
  }
  get numbers() {
    return this.#numbers;
  }
}

export default Lotto;
