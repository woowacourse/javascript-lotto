class Lotto {
  #numbers;

  constructor(numbers) {
    this.#numbers = this.sort(numbers);
  }

  get numbers() {
    return this.#numbers;
  }

  sort(numbers) {
    return numbers.sort((a, b) => a - b);
  }
}

module.exports = Lotto;
