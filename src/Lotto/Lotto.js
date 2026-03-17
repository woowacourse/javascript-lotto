import ERROR_MESSAGE from "../constants/errorMessage.js";
import LottoNumber from "./LottoNumber.js";

class Lotto {
  #numbers;

  constructor(numbers) {
    this.validateLotto(numbers);
    const lottoNumbers = numbers
      .sort((a, b) => a - b)
      .map((number) => new LottoNumber(number));
    this.#numbers = lottoNumbers;
  }

  validateLotto(numbers) {
    const uniqueNumbers = new Set(numbers);

    if (uniqueNumbers.size !== numbers.length) {
      throw new Error(ERROR_MESSAGE.LOTTO.DUPLICATE);
    }

    if (
      numbers.some(
        (number) => Number.isNaN(number) || !Number.isInteger(number),
      )
    ) {
      throw new Error(ERROR_MESSAGE.LOTTO.INTEGER);
    }

    if (numbers.length !== 6) {
      throw new Error(ERROR_MESSAGE.LOTTO.LENGTH);
    }

    if (numbers.some((number) => number < 1 || number > 45)) {
      throw new Error(ERROR_MESSAGE.LOTTO.RANGE);
    }
  }

  getNumbers() {
    return [...this.#numbers];
  }

  parseNumbers() {
    return [...this.#numbers.map(Number)];
  }

  includes(number) {
    return this.#numbers.some((lottoNumber) => lottoNumber.equals(number));
  }

  matchCount(winningNumbers) {
    const numbersSet = new Set([
      ...winningNumbers.map(Number),
      ...this.#numbers.map(Number),
    ]);
    return this.#numbers.length + winningNumbers.length - numbersSet.size;
  }
}

export default Lotto;
