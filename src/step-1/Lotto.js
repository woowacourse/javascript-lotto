import ERROR_MESSAGE from '../constants/errorMessage.js';
import LottoNumber from './LottoNumber.js';

class Lotto {
  #numbers;

  constructor(numbers) {
    this.validateLotto(numbers);
    const lottoNumbers = numbers
    .toSorted((a, b) => a - b)
    .map((number) => new LottoNumber(number));
    this.#numbers = lottoNumbers;
  }

  validateLotto(numbers) {
    if (numbers.length !== 6) {
      throw new Error(ERROR_MESSAGE.LOTTO.LENGTH);
    }

    const uniqueNumbers = new Set(numbers);

    if (uniqueNumbers.size !== numbers.length) {
      throw new Error(ERROR_MESSAGE.LOTTO.DUPLICATE);
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

  matchCount(other) {
    const lottoSet = new Set(this.parseNumbers());
    const winningLottoSet = new Set(other.parseNumbers());
    return lottoSet.intersection(winningLottoSet).size;
  }
}

export default Lotto;
