class WinningLotto {
  #winningNumber;
  #bonusNumber;

  constructor(winningNumber, bonusNumber) {
    this.#winningNumber = this.#splitWinnigNumber(winningNumber);
    this.#bonusNumber = Number(bonusNumber);
  }

  #splitWinnigNumber(winningNumber) {
    return winningNumber.split(",").map(Number);
  }

  hasNumber(number) {
    return this.#winningNumber.includes(number);
  }

  isBonus(number) {
    return this.#bonusNumber === number;
  }
}

export default WinningLotto;
