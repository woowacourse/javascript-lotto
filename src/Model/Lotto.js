import { ERROR_MESSAGE, LOTTO } from "../constants.js";
import Validator from "../Validator.js";

class Lotto {
  #numbers;

  constructor(randomNumbers) {
    randomNumbers.forEach((randomNumber) => {
      Validator.validatePositiveNumber(randomNumber);
      Validator.validateNumberLower(LOTTO.LOWER, randomNumber);
      Validator.validateNumberUpper(LOTTO.UPPER, randomNumber);
    });

    Validator.validateNotDuplicated(randomNumbers);
    Validator.validateArrayLength(randomNumbers, LOTTO.COUNT);
    this.#numbers = randomNumbers.toSorted((a, b) => a - b);
  }

  hasNumber(targetNumber) {
    return this.#numbers.includes(targetNumber);
  }

  getNumbers() {
    return this.#numbers;
  }
}

export default Lotto;
