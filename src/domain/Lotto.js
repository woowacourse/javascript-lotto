import { LOTTO_CONDITION, LOTTO_NUMBER_ERROR_MESSAGES } from '../constants/constants.js';

class Lotto {
  #numbers;

  constructor(numbers) {
    this.#numbers = numbers;
    this.#validate();
  }

  #validate() {
    if (this.#numbers.length !== LOTTO_CONDITION.COUNT) {
      throw new Error(LOTTO_NUMBER_ERROR_MESSAGES.COUNT);
    }

    this.#numbers.forEach((number) => {
      if (!Number.isInteger(number)) throw new Error(LOTTO_NUMBER_ERROR_MESSAGES.INTIGER);
    });

    this.#numbers.forEach((number) => {
      if (number < LOTTO_CONDITION.MIN_NUMBER || number > LOTTO_CONDITION.MAX_NUMBER)
        throw new Error(LOTTO_NUMBER_ERROR_MESSAGES.RANGE);
    });

    const lottoSet = new Set(this.#numbers);
    if (this.#numbers.length !== lottoSet.size) {
      throw new Error(LOTTO_NUMBER_ERROR_MESSAGES.DUPLICATE);
    }
  }

  get numbers() {
    return this.#numbers;
  }
}

export default Lotto;
