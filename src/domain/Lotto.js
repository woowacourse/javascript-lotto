class Lotto {
  #numbers = [];

  constructor(numbers) {
    if (!this.isValidLottoNumbers(numbers)) {
      throw new Error('[ERROR]: 잘못된 입력입니다.');
    }
    if (this.isDuplicateNumbers(numbers)) {
      throw new Error('[ERROR]: 중복된 입력입니다.');
    }

    this.#numbers = numbers.sort((a, b) => a - b);
  }

  isDuplicateNumbers(numbers) {
    return new Set(numbers).size !== 6 || numbers.length !== 6;
  }

  isValidLottoNumbers(numbers) {
    return numbers.every(this.isValidLottoNumber);
  }

  isValidLottoNumber = (number) => {
    const MIN_NUMBER = 1;
    const MAX_NUMBER = 45;

    return number >= MIN_NUMBER && number <= MAX_NUMBER;
  };

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
