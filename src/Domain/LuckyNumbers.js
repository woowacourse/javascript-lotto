class LuckyNumbers {
  #winningNumbers;
  #bonusNumber;

  constructor(winningNumbers, bonusNumber) {
    this.#winningNumbers = winningNumbers;
    this.#bonusNumber = bonusNumber;
  }

  winningNumbers() { return this.#winningNumbers; }
  bonusNumber() { return this.#bonusNumber; }

  setWinningNumbers(winningNumbers) {
    this.#winningNumbers = winningNumbers;
  }

  setBonusNumber(bonusNumber) {
    this.#bonusNumber = bonusNumber;
  }

}

export default LuckyNumbers;