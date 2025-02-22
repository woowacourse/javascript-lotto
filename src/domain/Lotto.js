import { LOTTO_NUMBERS_ERROR_MESSAGE } from "../lottoConstants/errorMessage.js";
import { LOTTO_NUMBERS } from "../lottoConstants/systemConstants.js";
import validationCondition from "../validation/validateCondition.js";

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
    if (!validationCondition.isLengthValid(numbers, LOTTO_NUMBERS.LENGTH)) {
      throw new Error(LOTTO_NUMBERS_ERROR_MESSAGE.LENGTH);
    }
    if (!validationCondition.isRangeValid(numbers, LOTTO_NUMBERS.MIN, LOTTO_NUMBERS.MAX)) {
      throw new Error(LOTTO_NUMBERS_ERROR_MESSAGE.RANGE);
    }
    if (!validationCondition.isDistinct(numbers)) {
      throw new Error(LOTTO_NUMBERS_ERROR_MESSAGE.DUPLICATE);
    }
  }
}

export default Lotto;
