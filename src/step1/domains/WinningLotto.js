class WinningLotto {
  #winningLotto;
  #bonusNumber;

  constructor(winningLotto, bonusNumber, lottoRules) {
    lottoRules.validateForBonusNumber(winningLotto, bonusNumber);
    this.#winningLotto = winningLotto;
    this.#bonusNumber = bonusNumber;
  }

  getWinningInfo() {
    return {
      winningNumber: this.#winningLotto.getNumbers(),
      bonusNumber: this.#bonusNumber,
    };
  }
}

export default WinningLotto;
