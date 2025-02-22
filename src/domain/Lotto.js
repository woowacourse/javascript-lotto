import { LOTTO_NUMBERS_ERROR_MESSAGE } from "../lottoConstants/errorMessage.js";
import { LOTTO_NUMBERS } from "../lottoConstants/systemConstants.js";

class Lotto {
  #numbers;

  constructor(numbers) {
    this.validate(numbers);
    this.#numbers = numbers.sort((a, b) => a - b);
  }

  get numbers() {
    return this.#numbers;
  }

  validate(numbers) {
    if (!this.isLengthValid(numbers)) {
      throw new Error(LOTTO_NUMBERS_ERROR_MESSAGE.LENGTH);
    }
    if (!this.isRangeValid(numbers)) {
      throw new Error(LOTTO_NUMBERS_ERROR_MESSAGE.RANGE);
    }
    if (!this.isDistinct(numbers)) {
      throw new Error(LOTTO_NUMBERS_ERROR_MESSAGE.DUPLICATE);
    }
  }
  isLengthValid(numbers) {
    return numbers.length === LOTTO_NUMBERS.LENGTH;
  }
  isRangeValid(numbers) {
    return !numbers.some((number) => number < 1 || number > 45);
  }
  isDistinct(numbers) {
    return new Set(numbers).size === numbers.length;
  }
}

export default Lotto;
