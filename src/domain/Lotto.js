import { isValidLottoNumbers, isDuplicateNumbers } from '../validation';

class Lotto {
  #numbers = [];

  constructor(numbers) {
    if (!isValidLottoNumbers(numbers)) {
      throw new Error(Lotto.ERROR_INVALID);
    }
    if (isDuplicateNumbers(numbers)) {
      throw new Error(Lotto.ERROR_DUPLICATE);
    }

    this.#numbers = numbers.sort((a, b) => a - b);
  }

  static ERROR_INVALID = '잘못된 입력입니다.';
  static ERROR_DUPLICATE = '중복된 입력입니다.';

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
