class Winning {
  #winningNumbers;
  #bonusNumber;

  constructor() {}

  getWinningNumbers() {
    return this.#winningNumbers;
  }

  getBonusNumber() {
    return this.#bonusNumber;
  }

  setWinningNumbers(winningNumbers) {
    this.#winningNumbers = this.validateWinningNumbers(winningNumbers);
  }

  setBonusNumber(bonusNumber) {
    this.#bonusNumber = this.validateBonusNumber(bonusNumber);
  }
}

export default Winning;
