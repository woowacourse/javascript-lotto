class Lotto {
  #numbers;

  constructor(numbers) {
    this.#numbers = [...numbers].sort((a, b) => a - b);
  }

  getNumbers() {
    return [...this.#numbers];
  }
}

export default Lotto;
