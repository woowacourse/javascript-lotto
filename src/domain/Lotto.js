class Lotto {
  #numbers;

  constructor(numbers) {
    this.#validateNumbers(numbers);
    this.#numbers = numbers;
  }

  #validateNumbers(numbers) {
    if (numbers.length !== 6) {
      throw new Error('[ERROR] 로또 번호는 6개여야 합니다.');
    }

    if (new Set(numbers).size !== numbers.length) {
      throw new Error('[ERROR] 로또 번호는 중복되어선 안 됩니다.');
    }

    if (!numbers.every((number) => Number.isInteger(Number(number)))) {
      throw new Error('[ERROR] 로또 번호는 전부 정수여야 합니다.');
    }

    if (!numbers.every((number) => number >= 1 && number <= 45)) {
      throw new Error('[ERROR] 로또 번호는 전부 1에서 45 사이의 숫자여야 합니다.');
    }
  }

  getNumbers() {
    return this.#numbers;
  }
}

export default Lotto;
