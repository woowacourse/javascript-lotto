import { validateLotto } from '../utils/validation.js';

export default class Lotto {
  #numbers;

  constructor(numbers) {
    validateLotto(numbers);
    this.#numbers = numbers;
  }

  get ascendingNumbers() {
    const ascendingNumbers = this.#numbers
      .map((number) => number)
      .sort((prevNumber, nextNumber) => prevNumber - nextNumber);

    return ascendingNumbers;
  }
}
