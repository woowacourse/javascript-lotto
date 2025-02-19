class LottoMatch {
  #winningNumbers;
  #bonusNumber;

  constructor(winningNumbers, bonusNumber) {
    this.#winningNumbers = winningNumbers;
    this.#bonusNumber = bonusNumber;
  }

  winningNumbers(lotto) {
    const matchCount = this.#winningNumbers.filter((number) => lotto.includeNumber(number)).length;
    return matchCount;
  }

  BonusNumber(lotto) {
    return lotto.includeNumber(this.#bonusNumber);
  }
}

export default LottoMatch;
