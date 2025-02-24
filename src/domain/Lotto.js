import { LOTTO_NUMBERS_ERROR_MESSAGE } from "../constants/errorMessage.js";
import { LOTTO_NUMBERS } from "../constants/systemConstants.js";
import validationCondition from "../validation/validateCondition.js";

class Lotto {
  #numbers;

  constructor(numbers) {
    if (!validationCondition.isLengthValid(numbers)) {
      throw new Error(LOTTO_NUMBERS_ERROR_MESSAGE.LENGTH);
    }
    if (!validationCondition.isRangeValid(numbers)) {
      throw new Error(LOTTO_NUMBERS_ERROR_MESSAGE.RANGE);
    }
    if (!validationCondition.isDistinct(numbers)) {
      throw new Error(LOTTO_NUMBERS_ERROR_MESSAGE.DUPLICATE);
    }
    this.#numbers = numbers.sort((a, b) => a - b);
  }

  toString() {
    return String(this.#numbers);
  }

  has(number) {
    return this.#numbers.includes(number);
  }

  match(lotto) {
    return this.#numbers.filter((number) => lotto.has(number));
  }
}

export default Lotto;
