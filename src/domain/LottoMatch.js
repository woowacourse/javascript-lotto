class LottoMatch {
  #winningNumbers;
  #bonusNumber;

  constructor(winningNumbers, bonusNumber) {
    this.#winningNumbers = winningNumbers;
    this.#bonusNumber = bonusNumber;
  }

  countMatchingNumbers(lotto) {
    return this.#winningNumbers.numbers.filter((number) => lotto.hasBonusNumber(number)).length;
  }

  hasBonusNumber(lotto) {
    return lotto.hasBonusNumber(this.#bonusNumber);
  }
}

export default LottoMatch;
