class Lotto {
  #numbers;

  constructor(numbers) {
    this.#numbers = numbers;
  }

  calculateMatchCount(winningNumbers) {
    return winningNumbers.filter((winningNumber) =>
      this.#numbers.includes(winningNumber)
    ).length;
  }

  isBonus(bonusNumber) {
    return this.#numbers.includes(bonusNumber);
  }

  get numbers() {
    return this.#numbers;
  }
}

export default Lotto;
