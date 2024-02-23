import { isExpectedArrayLength } from "../utils/checkLength.js";
import { generateRandomNumbers } from "../utils/generateRandomNumbers.js";
import { isOverlapped } from "../utils/isOverlapped.js";
import { sortNumbersAscend } from "../utils/sortNumbersAscend.js";
import LottoNumber from "./LottoNumber.js";
import { ERROR_MESSAGE } from "../error/ErrorMessage.js";
import CustomError from "../error/CustomError.js";

const LOTTO_CONSTANTS = {
  NUMBER_COUNT: 6,
  SEPARATOR: ",",
};

class Lotto {
  static NUMBER_COUNT = 6;

  static SEPARATOR = ",";

  #numbers;

  constructor(numbers) {
    if (typeof numbers === "string") this.#constructorWithNumStr(numbers);
    if (numbers === undefined) this.#constructorWithoutArg();
    this.#numbers = sortNumbersAscend(this.#numbers).map(
      (num) => new LottoNumber(num)
    );
  }

  #constructorWithNumStr(numbers) {
    const parsedNumbers = numbers.split(Lotto.SEPARATOR).map(Number);

    this.#validate(parsedNumbers);

    this.#numbers = parsedNumbers;
  }

  #constructorWithoutArg() {
    this.#numbers = generateRandomNumbers(
      LottoNumber.MIN,
      LottoNumber.MAX,
      LOTTO_CONSTANTS.NUMBER_COUNT
    );
  }

  get() {
    return this.#numbers.map((num) => num.get());
  }

  #validate(numbers) {
    // 중복없이 6개가 아닌 로또 넘버가 들어온 경우와 중복있는 로또 넘버가 들어온 경우의 오류를 다르게 주기 위해
    if (!isExpectedArrayLength(numbers, LOTTO_CONSTANTS.NUMBER_COUNT))
      throw new CustomError(ERROR_MESSAGE.lottoNumbersTooManyOrLess);

    if (isOverlapped(numbers))
      throw new CustomError(ERROR_MESSAGE.lottoNumbersOverlapped);
  }

  checkHaveBonus(bonusLottoNumber) {
    const hasBonusNumber = this.#numbers.some(
      (num) => num.get() === bonusLottoNumber
    );

    if (hasBonusNumber)
      throw new CustomError(ERROR_MESSAGE.bonusNumberOverlapped);
  }
}

export { Lotto, LOTTO_CONSTANTS };
