import CONDITION from '../../constant/Condition.js';
import ERROR from '../../constant/Error.js';

class LottoNumber {
  #number;
  constructor(numStr) {
    this.#validate(numStr);
    this.#number = numStr;
  }

  #validate(numStr) {
    this.#validateBlank(numStr);
    this.#validateNotNumber(numStr);
    this.#validateInRange(numStr);
    this.#validateInteger(numStr);
  }

  getNumber() {
    return Number(this.#number);
  }

  #validateBlank(numStr) {
    if (!numStr) {
      throw new Error(ERROR.beNotBlank);
    }
  }

  #validateNotNumber(numStr) {
    if (Number.isNaN(Number(numStr))) {
      throw new Error(ERROR.beNumber);
    }
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
}

export default LottoNumber;
