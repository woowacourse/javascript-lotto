import { ERROR_MESSAGE, LOTTO } from "../constants.js";
import Validator from "../Validator.js";

class Lotto {
  #numbers;

  constructor(numbers) {
    numbers.forEach((number) => {
      Validator.validatePositiveNumber(number);
      Validator.validateNumberLower(LOTTO.LOWER, number);
      Validator.validateNumberUpper(LOTTO.UPPER, number);
    });

    Validator.validateNotDuplicated(numbers);
    Validator.validateArrayLength(numbers, LOTTO.COUNT);
    this.#numbers = numbers.toSorted((a, b) => a - b);
  }

  checkDuplicate(number) {
    if (this.#numbers.includes(number)) {
      throw new Error(ERROR_MESSAGE.PREFIX);
    }
  }

  getNumbers() {
    return this.#numbers;
  }
}

export default Lotto;
