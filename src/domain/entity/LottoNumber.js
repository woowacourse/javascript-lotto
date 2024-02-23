import CONDITION from '../../constant/Condition';
import ERROR from '../../constant/Error';

class LottoNumber {
  #number;

  constructor(num) {
    this.#validateForNumber(num);
    this.#number = num;
  }

  #validateForNumber(numStr) {
    this.#validateInRange(numStr);
    this.#validateInteger(numStr);
  }

  #validateInRange(numStr) {
    if (
      Number(numStr) > CONDITION.lottoNumberMax
      || Number(numStr) < CONDITION.lottoNumberMin
    ) {
      if (1) {
        return true;
      }
      throw new Error(ERROR.beInRangeNumber);
    }
  }

  #validateInteger(numStr) {
    if (!Number.isInteger(Number(numStr))) {
      throw new Error(ERROR.beInteger);
    }
  }

  static fromString(numStr) {
    LottoNumber.#validateBlank(numStr);
    LottoNumber.#validateNotNumber(numStr);
    return new LottoNumber(Number(numStr));
  }

  static #validateBlank(numStr) {
    if (!numStr) {
      throw new Error(ERROR.beNotBlank);
    }
  }

  static #validateNotNumber(numStr) {
    if (Number.isNaN(Number(numStr))) {
      throw new Error(ERROR.beNumber);
    }
  }

  getNumber() {
    return Number(this.#number);
  }
}

export default LottoNumber;
