import { LOTTO } from '../constants/CONFIGURATIONS.js';
import { ERROR_MESSAGE } from '../constants/MESSAGES.js';

class Lotto {
  #numbers;

  constructor(numbers) {
    this.#validate(numbers);
    this.#numbers = numbers;
  }

  get numbers() {
    return [...this.#numbers];
  }

  #validate(numbers) {
    this.#checkType(numbers);
    this.#checkLength(numbers);
    this.#checkRange(numbers);
    this.#checkDuplicated(numbers);
  }

  #checkType(numbers) {
    if (numbers.some((number) => typeof number !== 'number')) {
      throw new Error(ERROR_MESSAGE.LOTTO.INVALID_TYPE);
    }
  }

  #checkLength(numbers) {
    if (numbers.length !== LOTTO.NUMBER_LENGTH) {
      throw new Error(ERROR_MESSAGE.LOTTO.INVALID_LENGTH);
    }
  }

  #checkRange(numbers) {
    if (numbers.some((number) => number < LOTTO.MIN_NUMBER || number > LOTTO.MAX_NUMBER)) {
      throw new Error(ERROR_MESSAGE.LOTTO.INVALID_RANGE);
    }
  }

  #checkDuplicated(numbers) {
    if (new Set(numbers).size !== LOTTO.NUMBER_LENGTH) {
      throw new Error(ERROR_MESSAGE.LOTTO.DUPLICATE);
    }
  }
}

export default Lotto;
