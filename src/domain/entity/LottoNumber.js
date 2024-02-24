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
      Number(numStr) > CONDITION.lottoNumberMax ||
      Number(numStr) < CONDITION.lottoNumberMin
    ) {
      throw new Error(ERROR.beInRangeNumber);
    }
  }

  #validateInteger(numStr) {
    if (!Number.isInteger(Number(numStr))) {
      throw new Error(ERROR.beInteger);
    }
  }

  static fromString(numStr) {
    LottoNumber.#validateNumber(numStr);
    LottoNumber.#validateBlank(numStr);
    return new LottoNumber(Number(numStr));
  }

  static #validateBlank(numStr) {
    if (!numStr) {
      throw new Error(ERROR.beNotBlank);
    }
  }

  static #validateNumber(numStr) {
    if (isNaN(numStr)) {
      throw new Error(ERROR.beNumber);
    }
  }

  getNumber() {
    return Number(this.#number);
  }
}

export default LottoNumber;
