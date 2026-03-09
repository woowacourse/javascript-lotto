import Validator from "../Validator";

class Lotto {
  #validator;

  #numbers;

  constructor(numbers) {
    this.#validator = new Validator();
    this.#validator.validateLottoNumbers(numbers);

    this.#numbers = numbers;
  }

  getNumbers() {
    return [...this.#numbers];
  }

  toString() {
    return `[${this.#numbers.join(", ")}]`;
  }
}

export default Lotto;
