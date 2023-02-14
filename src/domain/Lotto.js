class Lotto {
  #numbers;

  constructor(numbers) {
    this.validateLotto(numbers);
    this.#numbers = this.sort(numbers);
  }

  get numbers() {
    return this.#numbers;
  }

  sort(numbers) {
    return numbers.sort((a, b) => a - b);
  }

  validateLotto(numbers) {
    if (numbers.some((num) => 1 > num || num > 45)) throw new Error();
  }
}

module.exports = Lotto;
