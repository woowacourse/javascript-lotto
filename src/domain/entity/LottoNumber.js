class LottoNumber {
  constructor(numStr) {
    this.#validate(numStr);
  }

  #validate(numStr) {
    this.#validateBlank(numStr);
  }

  #validateBlank(numStr) {
    if (!numStr) {
      throw new Error('[Error]');
    }
  }
}

export default LottoNumber;
