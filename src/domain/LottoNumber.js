import MESSAGES from "../constants/messages.js";
import { validateTypeInteger } from "../utils/validator.js";

export default class LottoNumber {
  static MIN = 1;
  static MAX = 45;

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
    if (number < LottoNumber.MIN || number > LottoNumber.MAX) {
      throw new Error(MESSAGES.ERROR.notInLottoNumberRange);
    }
  }
}
