class Lotto {
  #numbers;

  constructor(numbers) {
    this.#numbers = numbers;
  }

  getMatchCount = (winningNumbers) => {
    return winningNumbers.reduce(
      (count, winningNumber) =>
        this.#numbers.includes(winningNumber) ? count + 1 : count,
      0
    );
  };

  getBonusMatched = (bonusNumber) => {
    return this.#numbers.includes(bonusNumber);
  };

  getMatchResult = (winningNumbers, bonusNumber) => {
    return {
      matchCount: this.getMatchCount(winningNumbers),
      isBonusMatched: this.getBonusMatched(bonusNumber),
    };
  };

  get numbers() {
    return this.#numbers;
  }
}

export default Lotto;
