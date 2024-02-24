import LottoValidation from '../validation/lottoValidation';

class Lotto {
  #numbers;

  constructor(numbers = []) {
    LottoValidation.validateNumbers(numbers);
    this.#numbers = this.sortNumbers(numbers);
  }

  sortNumbers(numbers = []) {
    return numbers.sort((a, b) => a - b);
  }

  getNumbers() {
    return [...this.#numbers];
  }
}

export default Lotto;
