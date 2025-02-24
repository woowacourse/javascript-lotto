import { LOTTO_NUMBERS_ERROR_MESSAGE } from "../constants/errorMessage.js";
import { LOTTO_NUMBERS } from "../constants/systemConstants.js";

class Lotto {
  #numbers;

  constructor(numbers) {
    if (!this.isLengthValid(numbers)) {
      throw new Error(LOTTO_NUMBERS_ERROR_MESSAGE.LENGTH);
    }
    if (!this.isRangeValid(numbers)) {
      throw new Error(LOTTO_NUMBERS_ERROR_MESSAGE.RANGE);
    }
    if (!this.isDistinct(numbers)) {
      throw new Error(LOTTO_NUMBERS_ERROR_MESSAGE.DUPLICATE);
    }
    this.#numbers = numbers.sort((a, b) => a - b);
  }

  toString() {
    return String(this.#numbers);
  }

  isLengthValid(numbers) {
    return numbers.length === LOTTO_NUMBERS.LENGTH;
  }
  isRangeValid(numbers) {
    return !numbers.some((number) => number < LOTTO_NUMBERS.MIN || number > LOTTO_NUMBERS.MAX);
  }
  isDistinct(numbers) {
    return new Set(numbers).size === numbers.length;
  }

  has(number) {
    return this.#numbers.includes(number);
  }

  match(lotto) {
    return this.#numbers.filter((number) => lotto.has(number));
  }
}

export default Lotto;
