import { validateTypeInteger } from "../utils/validator.js";

import { ERROR_MESSAGE } from "../constants/messages.js";

export const LOTTO_NUMBER_MIN = 1;
export const LOTTO_NUMBER_MAX = 45;

export default class LottoNumber {
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
    if (number < LOTTO_NUMBER_MIN || number > LOTTO_NUMBER_MAX) {
      throw new Error(ERROR_MESSAGE.notInLottoNumberRange);
    }
  }
}
