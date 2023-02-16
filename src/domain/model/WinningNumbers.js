class WinningNumbers {
  #numbers;

  constructor(input) {
    const winningNumbers = input.split(',').map(Number);

    this.#numbers = winningNumbers;
  }

  getNumbers() {
    return this.#numbers;
  }
}

module.exports = WinningNumbers;
