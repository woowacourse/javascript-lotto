import { isPositiveInteger } from '../validation';

class Lotto {
  static SIZE = 6;
  static MIN_NUMBER = 1;
  static MAX_NUMBER = 45;

  static ERROR_VALID_NUMBER = `로또 번호는 ${Lotto.MIN_NUMBER}에서 ${Lotto.MAX_NUMBER} 사이의 정수여야 합니다.`;
  static ERROR_LOTTO_SIZE = `로또 번호를 ${Lotto.SIZE}개 입력해주세요.`;
  static ERROR_DUPLICATE = '로또 번호를 중복으로 입력할 수 없습니다.';

  #numbers = [];

  constructor(numbers) {
    this.validateNumbers(numbers);

    this.#numbers = numbers.sort((a, b) => a - b);
  }

  validateNumbers(numbers) {
    if (!numbers.every(Lotto.isLottoNumber)) throw new Error(Lotto.ERROR_VALID_NUMBER);

    if (!Lotto.isValidSize(numbers)) throw new Error(Lotto.ERROR_LOTTO_SIZE);

    if (Lotto.hasDuplicate(numbers)) throw new Error(Lotto.ERROR_DUPLICATE);
  }

  static isLottoNumber(number) {
    if (!isPositiveInteger(number)) return false;

    return number >= Lotto.MIN_NUMBER && number <= Lotto.MAX_NUMBER;
  }

  static isValidSize(numbers) {
    return numbers.length === Lotto.SIZE;
  }

  static hasDuplicate(numbers) {
    return new Set(numbers).size !== Lotto.SIZE;
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
