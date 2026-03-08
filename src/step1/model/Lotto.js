import { LOTTO } from "../constant/index.js";
import { LOTTO_ERROR_MESSAGE } from "../constant/message.js";

class Lotto {
  #numbers;

  constructor(numbers) {
    this.#validate(numbers);
    this.#numbers = numbers.toSorted((a, b) => a - b);
  }

  #validate(numbers) {
    this.#validateCount(numbers);
    this.#validateUniq(numbers);
    numbers.forEach((number) => {
      this.#validateNumber(number);
      this.#validateRange(number);
    });
  }

  #validateCount(numbers) {
    if (numbers.length !== LOTTO.COUNT) {
      throw new Error(LOTTO_ERROR_MESSAGE.INPUT_NOT_SIX_NUMBER);
    }
  }

  #validateUniq(numbers) {
    const numbersSet = new Set(numbers);
    if (numbersSet.size !== numbers.length) {
      throw new Error(LOTTO_ERROR_MESSAGE.INPUT_DUPLICATE);
    }
  }

  #validateNumber(number) {
    if (typeof number !== 'number' || Number.isNaN(number)) {
      throw new Error(LOTTO_ERROR_MESSAGE.INPUT_RANGE);
    }
  }

  #validateRange(number) {
    if (number < LOTTO.MIN_NUMBER || number > LOTTO.MAX_NUMBER) {
      throw new Error(LOTTO_ERROR_MESSAGE.INPUT_RANGE);
    }
  }

  getNumbers() {
    return [...this.#numbers];
  }
}

export default Lotto;
