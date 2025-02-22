import validateLottoNumber from '../validations/validate/validateLottoNumber.js';

class Lotto {
  #numbers;

  constructor(numbers) {
    this.#numbers = Object.freeze(numbers.sort((a, b) => a - b));
    validateLottoNumber(this.#numbers);
  }

  hasNumber(winningNumber) {
    return this.numbers.includes(winningNumber);
  }

  get numbers() {
    return this.#numbers;
  }
}

export default Lotto;
