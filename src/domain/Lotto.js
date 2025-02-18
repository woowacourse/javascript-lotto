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
    this.#numbers = numbers;
  }

  get numbers() {
    return this.#numbers;
  }

  isLengthValid(numbers) {
    return numbers.length === LOTTO_NUMBERS.LENGTH;
  }

  isRangeValid(numbers) {
    return !numbers.some((number) => number < 1 || number > 45);
  }
}

export default Lotto;
