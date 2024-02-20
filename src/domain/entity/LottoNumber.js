class LottoNumber {
  constructor(numStr) {
    this.#validate(numStr);
  }

  #validate(numStr) {
    this.#validateBlank(numStr);
    this.#validateNotNumber(numStr);
  }

  #validateBlank(numStr) {
    if (!numStr) {
      throw new Error('[Error]');
    }
  }

  #validateNotNumber(numStr) {
    if (Number.isNaN(Number(numStr))) {
      throw new Error('[Error]');
    }
  }
}

export default LottoNumber;
