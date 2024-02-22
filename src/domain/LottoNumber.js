import { ERROR_MESSAGE } from "../error/ErrorMessage.js";

class LottoNumber {
  #number;
  static MIN = 1;
  static MAX = 45;

  constructor(number) {
    this.#validate(number);
    this.#number = number;
  }

  #validate(number) {
    if (isNaN(number)) throw new Error(ERROR_MESSAGE.lottoNumberNotNumber);

    const isOutOfRange = number < LottoNumber.MIN || number > LottoNumber.MAX;

    if (isOutOfRange) throw new Error(ERROR_MESSAGE.lottoNumberOutOfRange);
  }

  get() {
    return this.#number;
  }
}

export default LottoNumber;
