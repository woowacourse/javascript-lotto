import validateLottoNumber from '../validations/validate/LottoNumberValidate.js';

class Lotto {
  #numbers;

  constructor(numbers) {
    this.#numbers = numbers.sort((a, b) => a - b);
    this.#validate();
  }

  #validate() {
    validateLottoNumber(this.#numbers);
  }

  includeNumber(winningNumber) {
    return this.#numbers.includes(winningNumber);
  }

  get numbers() {
    return this.#numbers;
  }
}

export default Lotto;
