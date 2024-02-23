import MESSAGES from "../constants/messages.js";
import { validateTypeInteger } from "../utils/validator.js";

export default class LottoNumber {
  static MIN_LOTTO_NUMBER = 1;
  static MAX_LOTTO_NUMBER = 45;

  #number;

  constructor(number) {
    this.#validateLottoNumber(number);

    this.#number = number;
  }

  getNumber() {
    return this.#number;
  }

  #validateLottoNumber(value) {
    validateTypeInteger(value);

    this.#validateInLottoNumberRange(value);
  }

  #validateInLottoNumberRange(number) {
    if (
      number < LottoNumber.MIN_LOTTO_NUMBER ||
      number > LottoNumber.MAX_LOTTO_NUMBER
    ) {
      throw new Error(MESSAGES.ERROR.notInLottoNumberRange);
    }
  }
}
