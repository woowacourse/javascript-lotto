class Lotto {
  #numbers;

  constructor(numbers) {
    this.#numbers = numbers;
  }

  matchCount(numbers) {
    let matchCount = 0;
    numbers.forEach((number) => {
      matchCount += this.isMatch(number);
    });

    return matchCount;
  }

  isMatch(number) {
    return this.#numbers.includes(number);
  }

  get numbers() {
    return this.#numbers;
  }
}

export default Lotto;
