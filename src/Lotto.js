import ERROR_MESSAGE from "./constants/errorMessage";

class Lotto {
  #numbers;

  static UNIT = 1000;
  static MAX = 45;
  static MIN = 1;
  static LENGTH = 6;

  constructor(numbers) {
    this.validateLotto(numbers);
    this.#numbers = [...numbers].sort((a, b) => a - b);
  }

  validateLotto(numbers) {
    const isInteger = numbers.every((number) => Number.isInteger(number));

    if (!isInteger) {
      throw new Error(ERROR_MESSAGE.LOTTO.INTEGER);
    }

    const isOutOfRange = numbers.some((number) => number < 1 || number > 45);

    if (isOutOfRange) {
      throw new Error(ERROR_MESSAGE.LOTTO.RANGE);
    }

    const uniqueNumbers = new Set(numbers);

    if (uniqueNumbers.size !== numbers.length) {
      throw new Error(ERROR_MESSAGE.LOTTO.DUPLICATE);
    }
  }

  getNumbers() {
    return [...this.#numbers];
  }

  includes(number) {
    return this.#numbers.includes(number);
  }

  matchCount(winningNumbers) {
    const numbersSet = new Set([...winningNumbers, ...this.#numbers]);
    return this.#numbers.length + winningNumbers.length - numbersSet.size;
  }
}

export default Lotto;
