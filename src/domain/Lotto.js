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

  getLotto() {
    return this.#numbers.map((num) => num.getLottoNumber());
  }

  #validate(numbers) {
    if (!isExpectedArrayLength(numbers, Lotto.NUMBER_COUNT))
      throw new CustomError(ERROR_MESSAGE.lottoNumbersTooManyOrLess);

    if (isOverlapped(numbers))
      throw new CustomError(ERROR_MESSAGE.lottoNumbersOverlapped);
  }

  checkHaveBonus(bonusLottoNumber) {
    const isAlreadyHave = this.#numbers.some(
      (num) => num.getLottoNumber() === bonusLottoNumber
    );

    if (isAlreadyHave)
      throw new CustomError(ERROR_MESSAGE.bonusNumberOverlapped);
  }
}

export default Lotto;
