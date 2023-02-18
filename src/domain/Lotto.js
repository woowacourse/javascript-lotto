import { isPositiveInteger } from '../validation';
import {
  LOTTO_NUMBER_SIZE,
  LOTTO_NUMBER_RANGE_MIN,
  LOTTO_NUMBER_RANGE_MAX,
} from '../util/constants';

class Lotto {
  static ERROR_INVALID = '잘못된 입력입니다.';
  static ERROR_DUPLICATE = '중복된 입력입니다.';

  static isValidLottoNumber(number) {
    return isPositiveInteger(number) || this.isValidLottoNumberRange(number);
  }

  static isValidLottoNumberRange(number) {
    return number >= LOTTO_NUMBER_RANGE_MIN && number <= LOTTO_NUMBER_RANGE_MAX;
  }

  static isDuplicateNumbers(numbers) {
    return new Set(numbers).size !== LOTTO_NUMBER_SIZE || numbers.length !== LOTTO_NUMBER_SIZE;
  }

  static isValidLottoNumbers(numbers) {
    return numbers.every(Lotto.isValidLottoNumber);
  }

  #numbers = [];

  constructor(numbers) {
    if (!Lotto.isValidLottoNumbers(numbers)) {
      throw new Error(Lotto.ERROR_INVALID);
    }
    if (Lotto.isDuplicateNumbers(numbers)) {
      throw new Error(Lotto.ERROR_DUPLICATE);
    }

    this.#numbers = numbers.sort((a, b) => a - b);
  }

  getNumbers() {
    return this.#numbers;
  }

  hasBonus(bonusBall) {
    return this.#numbers.includes(bonusBall);
  }

  countMatch(other) {
    const matchNumbers = this.#numbers.filter((number) => {
      return other.#numbers.includes(number);
    });

    return matchNumbers.length;
  }
}

export default Lotto;
