class Lotto {
  #numbers;

  constructor(numbers) {
    this.#numbers = numbers;
  }

  getNumbers() {
    return [...this.#numbers];
  }

  toString() {
    return `[${this.#numbers.join(", ")}]`;
  }
}

export default Lotto;
