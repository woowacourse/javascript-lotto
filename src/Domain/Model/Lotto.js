import { validateLottoNumbers } from '../../Validation/validations.js';
class Lotto {
  #numbers;

  constructor(numbers) {
    validateLottoNumbers(numbers);
    this.#numbers = numbers;
  }

  getNumbers() {
    return [...this.#numbers];
  }
}

export default Lotto;
