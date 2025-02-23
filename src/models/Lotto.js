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

  updateMatchCount = (winningNumbers) => {
    const myLottoNumber = this.#numbers;

    winningNumbers.forEach((winningNumber) => {
      if (myLottoNumber.includes(winningNumber)) {
        this.incrementWinningNumbers();
      }
    });

    return this.#matchResult.matchCount;
  };

  updateBonusMatched = (bonusNumber) => {
    const myLottoNumber = this.#numbers;
    if (myLottoNumber.includes(bonusNumber)) {
      this.markBonusMatched();
      return true;
    }
    return false;
  };

  updateMatchResult = (winningNumbers, bonusNumber) => {
    this.updateMatchCount(winningNumbers);
    this.updateBonusMatched(bonusNumber);
  };

  get numbers() {
    return this.#numbers;
  }

  incrementWinningNumbers() {
    this.#matchResult.matchCount += 1;
  }

  markBonusMatched() {
    this.#matchResult.isBonusMatched = true;
  }

  get matchResult() {
    return this.#matchResult;
  }
}

export default Lotto;
