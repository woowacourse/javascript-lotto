import { isPositiveInteger } from '../validation';

class Lotto {
  static ERROR_INVALID = '잘못된 입력입니다.';
  static ERROR_DUPLICATE = '중복된 입력입니다.';
  static LOTTO_SIZE = 6;
  static MIN_NUMBER = 1;
  static MAX_NUMBER = 45;

  static isValidLottoNumber(number) {
    if (!isPositiveInteger(number)) return false;

    return number >= Lotto.MIN_NUMBER && number <= Lotto.MAX_NUMBER;
  }

  static isDuplicateNumbers(numbers) {
    return new Set(numbers).size !== Lotto.LOTTO_SIZE || numbers.length !== Lotto.LOTTO_SIZE;
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
