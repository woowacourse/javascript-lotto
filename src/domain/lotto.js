class Lotto {
  #numbers;

  constructor(numbers) {
    this.#numbers = numbers;
  }

  matchCount(numbers) {
    let matchCount = 0;
    this.#numbers.forEach((number) => {
      matchCount += numbers.includes(number);
    });

    return matchCount;
  }

  get numbers() {
    return this.#numbers;
  }
}

export default Lotto;
