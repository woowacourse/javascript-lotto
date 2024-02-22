import CustomError from "../error/CustomError.js";
import { ERROR_MESSAGE } from "../error/ErrorMessage.js";

class LottoNumber {
  #number;
  static MIN = 1;
  static MAX = 45;

  constructor(number) {
    const parsedNumber = Number(number);

    this.#validate(parsedNumber);
    this.#number = parsedNumber;
  }

  #validate(number) {
    if (isNaN(number))
      throw new CustomError(ERROR_MESSAGE.lottoNumberNotNumber);

    const isOutOfRange = number < LottoNumber.MIN || number > LottoNumber.MAX;

    if (isOutOfRange)
      throw new CustomError(ERROR_MESSAGE.lottoNumberOutOfRange);
  }

  get() {
    return this.#number;
  }
}

export default LottoNumber;
