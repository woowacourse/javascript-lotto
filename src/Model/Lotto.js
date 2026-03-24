import { ERROR_MESSAGE, LOTTO } from "../constants.js";
import {
  validateArrayLength,
  validateNotDuplicated,
  validateNumberLower,
  validateNumberUpper,
  validatePositiveNumber,
} from "../Validator.js";

class Lotto {
  #numbers;

  constructor(numbers) {
    numbers.forEach((number) => {
      validatePositiveNumber(number);
      validateNumberLower(LOTTO.LOWER, number);
      validateNumberUpper(LOTTO.UPPER, number);
    });

    validateNotDuplicated(numbers);
    validateArrayLength(numbers, LOTTO.COUNT);
    this.#numbers = numbers.sort((a, b) => a - b);
  }

  checkDuplicate(number) {
    if (this.#numbers.includes(number)) {
      throw new Error(ERROR_MESSAGE.BONUS_DUPLICATED);
    }
  }

  getNumbers() {
    return [...this.#numbers];
  }
}

export default Lotto;
