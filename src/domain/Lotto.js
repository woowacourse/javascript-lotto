import isExpectedArrayLength from "../utils/isExpectedArrayLength.js";
import isOverlapped from "../utils/isOverlapped.js";
import sortNumbersAscend from "../utils/sortNumbersAscend.js";
import LottoNumber from "./LottoNumber.js";
import CustomError from "../error/CustomError.js";
import { LOTTO } from "../constants/lotto.js";
import ERROR_MESSAGE from "../error/errorMessage.js";

class Lotto {
  #numbers;

  constructor(numbers) {
    this.#validate(numbers);

    this.#numbers = sortNumbersAscend(numbers).map(
      (num) => new LottoNumber(num)
    );
  }

  get() {
    return this.#numbers.map((num) => num.get());
  }

  #validate(numbers) {
    // 중복없이 6개가 아닌 로또 넘버가 들어온 경우와 중복있는 로또 넘버가 들어온 경우의 오류를 다르게 주기 위해
    if (!isExpectedArrayLength(numbers, LOTTO.count))
      throw new CustomError(ERROR_MESSAGE.lottoNumbersTooManyOrLess);

    if (isOverlapped(numbers))
      throw new CustomError(ERROR_MESSAGE.lottoNumbersOverlapped);
  }
}

export default Lotto;
