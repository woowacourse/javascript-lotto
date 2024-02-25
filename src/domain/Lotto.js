class Lotto {
  #numbers;

  constructor(numbers) {
    this.#numbers = numbers;
  }

  countMatchedNumbers(winningNumbers) {
    const count = winningNumbers.filter((number) => this.hasNumber(number)).length;
    return count;
  }

  hasNumber(number) {
    return this.#numbers.includes(number);
  }
}

export default Lotto;
