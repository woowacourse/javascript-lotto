class Win {
  #winningNumber;
  #bonusNumber;

  constructor(inputWinningNumber) {
    this.#winningNumber = inputWinningNumber;
  }

  get winningNumber() {
    return this.#winningNumber;
  }

  get bonusNumber() {
    return this.#bonusNumber;
  }

  set bonusNumber(inputBonusNumber) {
    this.#bonusNumber = inputBonusNumber;
  }
}

export default Win;
