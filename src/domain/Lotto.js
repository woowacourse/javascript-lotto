class Lotto {
  #numbers;

  constructor(numbers) {
    numbers.sort((a, b) => a - b);
    this.#numbers = numbers;
  }

  get numbers() {
    return this.#numbers;
  }
}

export default Lotto;
