import CustomError from "../utils/CustomError.js";
import { validateTypeInteger } from "../utils/validator.js";

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
      throw new CustomError("유효한 범위 로또 숫자가 아닙니다.");
    }
  }
}
