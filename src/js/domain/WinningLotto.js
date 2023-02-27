class WinningLotto {
  #winningNumber;

  #bonusNumber;

  constructor(winningNumber, bonusNumber) {
    this.#winningNumber = winningNumber;
    this.#bonusNumber = bonusNumber;
  }

  getWinningNumber() {
    return this.#winningNumber;
  }

  matchCount(lotto) {
    const numbers = new Set([...this.#winningNumber, ...lotto]);
    return this.#winningNumber.length + lotto.length - numbers.size;
  }

  hasBonusNumber(lotto) {
    return lotto.includes(this.#bonusNumber);
  }
}

export default WinningLotto;
