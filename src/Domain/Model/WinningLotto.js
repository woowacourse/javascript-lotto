class WinningLotto {
  #bonusNumber;
  #lotto;

  constructor(lotto, bonusNumber) {
    this.#lotto = lotto;
    this.#bonusNumber = bonusNumber;
  }

  getNumbers() {
    return [...this.#lotto.getNumbers()];
  }

  getBonusNumber() {
    return this.#bonusNumber;
  }

  countMatchingNumbers(lotto) {
    const matchingNumbers = this.#lotto
      .getNumbers()
      .filter((number) => lotto.getNumbers().includes(number)).length;
    return matchingNumbers;
  }

  checkBonusNumber(lotto) {
    return lotto.getNumbers().includes(this.#bonusNumber);
  }
}

export default WinningLotto;
