import { isExpectedArrayLength } from "../utils/checkLength.js";
import { generateRandomNumbers } from "../utils/generateRandomNumbers.js";
import { isOverlapped } from "../utils/isOverlapped.js";
import { sortNumbersAscend } from "../utils/sortNumbersAscend.js";
import LottoNumber from "./LottoNumber.js";
import { ERROR_MESSAGE } from "../error/ErrorMessage.js";
import CustomError from "../error/CustomError.js";

class Lotto {
  static NUMBER_COUNT = 6;
  static SEPARATOR = ",";
  #numbers;

  constructor(inputNumbers) {
    this.#numbers = typeof inputNumbers === 'string' ? this.#convertToNumbers(inputNumbers) : generateRandomNumbers(
      LottoNumber.MIN,
      LottoNumber.MAX,
      Lotto.NUMBER_COUNT
    );
    this.#numbers = sortNumbersAscend(this.#numbers).map(
      (num) => new LottoNumber(num)
    );
  }

  #convertToNumbers(inputString) {
    const parsedNumbers = inputString.split(Lotto.SEPARATOR).map(Number);

    this.#validate(parsedNumbers);

    return parsedNumbers;
  }

  get() {
    return this.#numbers.map((num) => num.get());
  }

  #validate(numbers) {
    // 중복없이 6개가 아닌 로또 넘버가 들어온 경우와 중복있는 로또 넘버가 들어온 경우의 오류를 다르게 주기 위해
    if (!isExpectedArrayLength(numbers, Lotto.NUMBER_COUNT))
      throw new CustomError(ERROR_MESSAGE.lottoNumbersTooManyOrLess);

    if (isOverlapped(numbers))
      throw new CustomError(ERROR_MESSAGE.lottoNumbersOverlapped);
  }

  checkHaveBonus(bonusLottoNumber) {
    const isAlreadyHave = this.#numbers.some(
      (num) => num.get() === bonusLottoNumber
    );

    if (isAlreadyHave)
      throw new CustomError(ERROR_MESSAGE.bonusNumberOverlapped);
  }
}

export default Lotto;
