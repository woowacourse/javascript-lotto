import ERROR_MESSAGE from '../settings/ErrorMessage.js';
class Lotto {
  #numbers;

  constructor(numbers) {
    this.#lottoValidation(numbers);
    this.#numbers = numbers;
  }
  #lottoValidation(numbers) {
    if (numbers.length !== 6) throw new Error(ERROR_MESSAGE.notSixNumbers);
  }
  get numbers() {
    return this.#numbers;
  }
}

export default Lotto;
