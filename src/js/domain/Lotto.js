class Lotto {
  #numbers;

  constructor(numbers) {
    this.#numbers = this.#sortNumbersAscending(numbers);
  }

  #sortNumbersAscending(numbers) {
    return numbers.sort((a, b) => a - b);
  }

  getNumbers() {
    return this.#numbers;
  }
}

export default Lotto;
