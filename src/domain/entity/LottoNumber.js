import ERROR from '../../constant/Error.js';

class LottoNumber {
  constructor(numStr) {
    this.#validate(numStr);
  }

  #validate(numStr) {
    this.#validateBlank(numStr);
    this.#validateNotNumber(numStr);
    this.#validateInRange(numStr);
    this.#validateInteger(numStr);
  }

  #validateBlank(numStr) {
    if (!numStr) {
      throw new Error(ERROR.beNotBlank);
    }
  }

  #validateNotNumber(numStr) {
    if (Number.isNaN(Number(numStr))) {
      throw new Error(ERROR.beNotNumber);
    }
  }
  #validateInRange(numStr) {
    if (Number(numStr) > 45 || Number(numStr) < 1) {
      throw new Error(ERROR.beInRangeNumber);
    }
  }
  #validateInteger(numStr) {
    if (!Number.isInteger(Number(numStr))) {
      throw new Error(ERROR.beInteger);
    }
  }
}

export default LottoNumber;
