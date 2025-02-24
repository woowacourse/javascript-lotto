class Lotto {
  #numbers;

  constructor(numbers) {
    this.#numbers = numbers;
  }

  getMatchCount = (winningNumbers) => {
    return this.#numbers.filter((number) => winningNumbers.includes(number))
      .length;
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
