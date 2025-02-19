class Lotto {
  #numbers;
  #matchResult;

  constructor(numbers) {
    this.#numbers = numbers;
    this.#matchResult = {
      matchedCount: 0,
      isBonusMatched: false,
    };
  }

  get numbers() {
    return this.#numbers;
  }

  incrementWinningNumbers() {
    this.#matchResult.matchedCount += 1;
  }

  markBonusMatched() {
    this.#matchResult.isBonusMatched = true;
  }

  get matchResult() {
    return this.#matchResult;
  }
}

export default Lotto;
