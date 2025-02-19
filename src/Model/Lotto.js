class Lotto {
  #numbers = Array.from({ length: 6 }).fill(0);

  constructor(numbers) {
    this.#numbers = numbers.sort((a, b) => a - b);
  }

  get numbers() {
    return this.#numbers;
  }
}

export default Lotto;
