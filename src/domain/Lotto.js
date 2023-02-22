class Lotto {
  #numbers;

  constructor(numbers) {
    this.#numbers = numbers;
  }

  calculateMatchCount(winningNumbers) {
    return this.#numbers.filter((number, idx) => number === winningNumbers[idx])
      .length;
  }

  isBonus(bonusNumber) {
    return this.#numbers.includes(bonusNumber);
  }

  get numbers() {
    return this.#numbers;
  }
}

export default Lotto;
