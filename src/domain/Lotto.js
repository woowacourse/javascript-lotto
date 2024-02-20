const PRIZE = {
  6: 1,
  5: 3,
  4: 4,
  3: 5,
  2: 0,
  1: 0,
  0: 0,
};

class Lotto {
  #numbers;

  constructor(numbers) {
    this.#numbers = numbers;
  }

  getNumbers() {
    return this.#numbers;
  }

  compareBonus(bonusNumber) {
    return this.#numbers.includes(bonusNumber) ? 2 : 3;
  }

  calculatePrize(winningNumbers, bonusNumber) {
    const prize = PRIZE[this.#numbers.filter((number) => winningNumbers.includes(number)).length];

    return prize === 3 ? this.compareBonus(bonusNumber) : prize;
  }
}

export default Lotto;
