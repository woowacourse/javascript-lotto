import { LOTTO } from "../constants.js";
import Validator from "../Validator.js";

class Lotto {
  #numbers;

  constructor(randomNumbers) {
    randomNumbers.forEach((randomNumber) => {
      Validator.positiveNumber(randomNumber);
      Validator.numberLower(LOTTO.LOWER, randomNumber);
      Validator.numberUpper(LOTTO.UPPER, randomNumber);
    });

    Validator.notDuplicated(randomNumbers);
    Validator.arrayLength(randomNumbers, LOTTO.COUNT);
    this.#numbers = randomNumbers.toSorted((a, b) => a - b);
  }

  hasNumber(targetNumber) {
    return this.#numbers.includes(targetNumber);
  }

  getNumbers() {
    return [...this.#numbers];
  }
}

export default Lotto;
