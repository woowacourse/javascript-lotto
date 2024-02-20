import { generateRandomNumbers } from "../utils/generateRandomNumbers.js";
import { sortNumbersAscend } from "../utils/sortNumbersAscend.js";

const MIN_LOTTO_NUMBER = 1;
const MAX_LOTTO_NUMBER = 45;
const LOTTO_NUMBER_COUNT = 6;
const SEPARATOR = ",";

class Lotto {
  #numbers;

  constructor(numbers) {
    // NOTE: 생성자의 타입이 다양할 때 이렇게 조건문을 걸어서 판별하는게 옳을까요?
    if (typeof numbers === "string") this.#constructorWithNumStr(numbers);
    if (numbers === undefined) this.#constructorWithoutArg();

    this.#numbers = sortNumbersAscend(this.#numbers);
  }

  // 오버로딩
  #constructorWithNumStr(numbers) {
    const parsedNumbers = numbers.split(SEPARATOR).map((num) => Number(num));

    this.#numbers = parsedNumbers;
  }

  #constructorWithoutArg() {
    this.#numbers = generateRandomNumbers(
      MIN_LOTTO_NUMBER,
      MAX_LOTTO_NUMBER,
      LOTTO_NUMBER_COUNT
    );
  }

  getNumbers() {
    return this.#numbers;
  }

  #validate(numbers) {}
}

export default Lotto;
