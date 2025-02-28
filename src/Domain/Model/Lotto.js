import { validateLottoNumbers } from '../../Validation/validateDomain.js';
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
