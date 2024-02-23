import { validateLotto } from '../utils/validation.js';

export default class Lotto {
  #numbers;

  constructor(numbers) {
    validateLotto(numbers);
    this.#numbers = numbers.toSorted((prevNumber, nextNumber) => prevNumber - nextNumber);
  }

  get getNumbers() {
    return this.#numbers;
  }
}
