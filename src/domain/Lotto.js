import validateLottoNumber from '../validations/validate/LottoNumberValidate.js';

class Lotto {
  #numbers;

  constructor(numbers) {
    this.#validate(numbers);
    this.#numbers = numbers.sort((a, b) => a - b);
  }

  #validate(numbers) {
    validateLottoNumber(numbers);
  }

  hasBonusNumber(winningNumber) {
    return this.#numbers.includes(winningNumber);
  }

  get numbers() {
    return [...this.#numbers];
  }
}

export default Lotto;
