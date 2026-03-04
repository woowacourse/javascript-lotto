class Lotto {
  #numbers;

  static UNIT = 1000;

  constructor(numbers) {
    this.#numbers = [...numbers].sort((a, b) => a - b);
  }

  getNumbers() {
    return [...this.#numbers];
  }
}

export default Lotto;
