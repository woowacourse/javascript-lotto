import { ERROR_MESSAGES } from '../constants';
import { isInteger, isLottoNumberInRange } from '../utils/validatorsUtils';

class LottoNumber {
  #number;

  /**
   * @param {number} number
   */
  constructor(number) {
    this.#validateLottoNumber(number);
  }

  get number() {
    return this.#number;
  }

  /**
   * @param {number} number
   */
  #validateLottoNumber(number) {
    if (!isInteger(number)) throw new Error(ERROR_MESSAGES.notInteger);

    if (!isLottoNumberInRange(number))
      throw new Error(ERROR_MESSAGES.invalidLottoNumberRange);

    this.#number = number;
  }
}

export default LottoNumber;
