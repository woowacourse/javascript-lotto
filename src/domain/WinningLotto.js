class WinningLotto {
  #winningNumber;
  #bonusNumber;

  constructor(winningNumber, bonusNumber) {
    this.#winningNumber = this.#splitWinnigNumber(winningNumber);
    this.#bonusNumber = bonusNumber;
  }

  getWinningNumber() {
    return this.#winningNumber;
  }

  getBonusNumber() {
    return this.#bonusNumber;
  }

  #splitWinnigNumber(winningNumber) {
    return winningNumber.split(",").map(Number);
  }
}

export default WinningLotto;
