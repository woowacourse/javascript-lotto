class Lotto {
  #numbers;
  #matchResult;

  constructor(numbers) {
    this.#numbers = numbers;
    this.#matchResult = {
      matchCount: 0,
      isBonusMatched: false,
    };
  }

  get numbers() {
    return [...this.#numbers];
  }

  incrementWinningNumbers() {
    this.#matchResult.matchCount += 1;
  }

  markBonusMatched() {
    this.#matchResult.isBonusMatched = true;
  }

  get matchResult() {
    return Object.assign({}, this.#matchResult);
  }
}

export default Lotto;
