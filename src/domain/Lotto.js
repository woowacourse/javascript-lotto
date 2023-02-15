import { isValidLottoNumber } from '../validation';

class Lotto {
  #numbers = [];

  constructor(numbers) {
    if (!numbers.every(isValidLottoNumber)) {
      throw new Error('[ERROR]: 잘못된 입력입니다.');
    }
    if (new Set(numbers).size !== 6 || numbers.length !== 6) {
      throw new Error('[ERROR]: 중복된 입력입니다.');
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
