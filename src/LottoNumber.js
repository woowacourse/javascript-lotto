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
      throw new Error();
    }

    if (number < 1 || number > 45) {
      throw new Error();
    }
  }
}

export default LottoNumber;
