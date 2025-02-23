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
    return this.#lotto.match(lotto);
  }

  checkBonusNumber(lotto) {
    return lotto.getNumbers().includes(this.#bonusNumber);
  }
}

export default WinningLotto;
