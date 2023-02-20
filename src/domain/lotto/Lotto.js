import { SEPARATOR } from '../../util/constants/constants.js';

class Lotto {
  #numbers;

  constructor(numbers, { minNumber, maxNumber, count }) {
    if (numbers.some(Number.isNaN)) {
      throw new Error('\n[ERROR] 로또 번호는 숫자로 입력해주세요.\n');
    }

    if (numbers.length !== count) {
      throw new Error(`\n[ERROR] 로또 번호는 ${SEPARATOR}로 구분하여 ${count}개 입력해 주세요. \n`);
    }

    if (!numbers.every((number) => number >= minNumber && number <= maxNumber)) {
      throw new Error(
        `\n[ERROR] 로또 번호는 ${minNumber}이상 ${maxNumber}이하만 입력 가능합니다.\n`
      );
    }

    if (numbers.length !== new Set(numbers).size) {
      throw new Error('\n[ERROR] 로또 번호는 중복될 수 없습니다. \n');
    }

    this.#numbers = new Set(numbers);
  }

  includes(targetNumber) {
    return this.#numbers.has(targetNumber);
  }

  getNumbers() {
    return new Set([...this.#numbers]);
  }
}

export default Lotto;
