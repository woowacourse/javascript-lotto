class Lotto {
  #numbers;

  constructor(numbers) {
    this.#numbers = numbers;
  }

  countMatchedNumbers(winningNumbers) {
    return winningNumbers.reduce((result, winningNumber) => {
      if (this.hasNumber(winningNumber)) {
        result += 1;
      }
      return result;
    }, 0);
  }

  hasNumber(number) {
    return this.#numbers.includes(number);
  }

  getNumbers() {
    return this.#numbers;
  }
}

export default Lotto;
