import { validateTypeInteger } from "../utils/validator.js";

import { ERROR_MESSAGE } from "../constants/messages.js";

export default class LottoNumber {
  static MIN = 1;
  static MAX = 45;

  #value;

  constructor(number) {
    this.#validateLottoNumber(number);

    this.#value = number;
  }

  getValue() {
    return this.#value;
  }

  #validateLottoNumber(value) {
    validateTypeInteger(value);

    this.#validateInLottoNumberRange(value);
  }

  #validateInLottoNumberRange(number) {
    if (number < LottoNumber.MIN || number > LottoNumber.MAX) {
      throw new Error(ERROR_MESSAGE.notInLottoNumberRange);
    }
  }
}
