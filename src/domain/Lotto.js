import { ERROR_MESSAGE } from "../constants/errorMessage";
import { SYSTEM_CONSTANTS } from "../constants/systemConstants";

class Lotto {
  #numbers;

  constructor(numbers) {
    if (!this.isLengthValid(numbers)) {
      throw new Error(ERROR_MESSAGE.LOTTO_NUMBERS_LENGTH);
    }
    this.#numbers = numbers;
  }

  get numbers() {
    return this.#numbers;
  }

  isLengthValid(numbers) {
    return numbers.length === SYSTEM_CONSTANTS.LOTTO_NUMBERS_LENGTH;
  }
}

export default Lotto;
