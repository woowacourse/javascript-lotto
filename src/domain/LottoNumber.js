import { LOTTO_NUMBER } from "../constants/lotto.js";
import CustomError from "../error/CustomError.js";
import ERROR_MESSAGE from "../error/errorMessage.js";

class LottoNumber {
  #number;

  constructor(number) {
    const parsedNumber = Number(number);

    this.#validate(parsedNumber);
    this.#number = parsedNumber;
  }

  #validate(number) {
    if (Number.isNaN(number))
      throw new CustomError(ERROR_MESSAGE.lottoNumberNotNumber);

    const isOutOfRange = number < LOTTO_NUMBER.min || number > LOTTO_NUMBER.max;

    if (isOutOfRange)
      throw new CustomError(ERROR_MESSAGE.lottoNumberOutOfRange);
  }

  get() {
    return this.#number;
  }
}

export default LottoNumber;
