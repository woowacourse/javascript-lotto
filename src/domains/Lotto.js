<<<<<<< HEAD
import { KEY } from '../constants/Configurations.js';
import {
  LottoNumbersValidator,
  validateDuplicate,
} from '../validators/LottoNumbersValidator.js';
=======
import { LOTTO } from '../constants/CONFIGURATIONS.js';
import { ERROR_MESSAGE } from '../constants/MESSAGES.js';
>>>>>>> 0f9ff21ed0cd6104c06a2b5d22feb4bc389fa693

class Lotto {
  #numbers;

  constructor(numbers) {
    this.#validate(numbers);
    this.#numbers = numbers;
  }

  get numbers() {
    return this.#numbers;
  }

  #validate(numbers) {
<<<<<<< HEAD
    LottoNumbersValidator.validate(KEY.LOTTO_NUMBERS, numbers);
    validateDuplicate(numbers);
=======
    this.#checkType(numbers);
    this.#checkLength(numbers);
    this.#checkRange(numbers);
    this.#checkDuplicated(numbers);
  }

  #checkType(numbers) {
    if (!numbers.every((number) => typeof number === 'number')) {
      throw new Error(ERROR_MESSAGE.LOTTO.INVALID_TYPE);
    }
  }

  #checkLength(numbers) {
    if (numbers.length !== LOTTO.LENGTH) {
      throw new Error(ERROR_MESSAGE.LOTTO.INVALID_LENGTH);
    }
  }

  #checkRange(numbers) {
    if (
      !numbers.every(
        (number) => number >= LOTTO.MIN_NUMBER && number <= LOTTO.MAX_NUMBER,
      )
    ) {
      throw new Error(ERROR_MESSAGE.LOTTO.INVALID_RANGE);
    }
  }

  #checkDuplicated(numbers) {
    if (new Set(numbers).size !== LOTTO.LENGTH) {
      throw new Error(ERROR_MESSAGE.LOTTO.DUPLICATE);
    }
>>>>>>> 0f9ff21ed0cd6104c06a2b5d22feb4bc389fa693
  }
}

export default Lotto;
