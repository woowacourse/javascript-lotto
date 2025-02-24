class LottoMatch {
  #winningNumbers;
  #bonusNumber;

  constructor(winningNumbers, bonusNumber) {
    this.#winningNumbers = winningNumbers;
    this.#bonusNumber = bonusNumber;
  }

  countMatchingNumbers(lotto) {
    const matchCount = this.#winningNumbers.numbers.filter((number) => lotto.hasBonusNumber(number)).length;
    return matchCount;
  }

  hasBonusNumber(lotto) {
    return lotto.hasBonusNumber(this.#bonusNumber);
  }
}

export default LottoMatch;
