class Lotto {
  #numbers = Array.from({ length: 6 }).fill(0);

  constructor(numbers) {
    this.#numbers = numbers;
  }

  get numbers() {
    return this.#numbers;
  }
}

export default Lotto;
