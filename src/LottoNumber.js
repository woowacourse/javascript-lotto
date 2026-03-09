import ERROR_MESSAGE from "./constants/errorMessage.js";

class LottoNumber {
  #number;

  constructor(number) {
    this.validateNumber(number);
    this.#number = number;
  }

  equals(other) {
    return this.#number === other.valueOf();
  }

  valueOf() {
    return this.#number;
  }

  validateNumber(number) {
    if (!Number.isInteger(number)) {
      throw new Error(ERROR_MESSAGE.LOTTO.INTEGER);
    }

    if (number < 1 || number > 45) {
      throw new Error(ERROR_MESSAGE.LOTTO.RANGE);
    }
  }
}

export default LottoNumber;
