import { generateRandomNumbers } from "../utils/generateRandomNumbers.js";
import { sortNumbersAscend } from "../utils/sortNumbersAscend.js";
import LottoNumber from "./LottoNumber.js";

class Lotto {
  static NUMBER_COUNT = 6;
  static SEPARATOR = ",";
  #numbers;

  constructor(numbers) {
    // NOTE: 생성자의 타입이 다양할 때 이렇게 조건문을 걸어서 판별하는게 옳을까요?
    if (typeof numbers === "string") this.#constructorWithNumStr(numbers);
    if (numbers === undefined) this.#constructorWithoutArg();

    this.#numbers = sortNumbersAscend(this.#numbers).map(
      (num) => new LottoNumber(num)
    );
  }

  // 오버로딩
  #constructorWithNumStr(numbers) {
    const parsedNumbers = numbers.split(Lotto.SEPARATOR).map(Number);

    // 유

    this.#numbers = parsedNumbers;
  }

  #constructorWithoutArg() {
    this.#numbers = generateRandomNumbers(
      LottoNumber.MIN,
      LottoNumber.MAX,
      Lotto.NUMBER_COUNT
    );
  }

  get() {
    return this.#numbers.map((num) => num.get());
  }
}

export default Lotto;
