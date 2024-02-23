import CONDITION from '../../constant/Condition';
import ERROR from '../../constant/Error';

class LottoNumber {
  #number;

  constructor(num) {
    this.#validateForNumber(
      num,
    );
    this.#number = num;
  }

  #validateForNumber(number) {
    this.#validateInRange(
      number,
    );
    this.#validateInteger(
      number,
    );
  }

  #validateInRange(number) {
    if (
      number >
        CONDITION.lottoNumberMax ||
      number <
        CONDITION.lottoNumberMin
    ) {
      throw new Error(
        ERROR.beInRangeNumber,
      );
    }
  }

  #validateInteger(numStr) {
    if (
      !Number.isInteger(
        numStr,
      )
    ) {
      throw new Error(
        ERROR.beInteger,
      );
    }
  }

  static fromString(numStr) {
    LottoNumber.#validateBlank(
      numStr,
    );
    LottoNumber.#validateNotNumber(
      numStr,
    );
    return new LottoNumber(
      Number(numStr),
    );
  }

  static #validateBlank(
    numStr,
  ) {
    if (!numStr) {
      throw new Error(
        ERROR.beNotBlank,
      );
    }
  }

  static #validateNotNumber(
    numStr,
  ) {
    if (isNaN(numStr)) {
      throw new Error(
        ERROR.beNumber,
      );
    }
  }

  getNumber() {
    return Number(
      this.#number,
    );
  }
}

export default LottoNumber;
