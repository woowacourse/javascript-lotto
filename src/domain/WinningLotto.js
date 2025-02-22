class WinningLotto {
  #winningLotto;
  #bonusNumber;

  constructor(winningLotto, bonusNumber) {
    this.#winningLotto = winningLotto
    this.#bonusNumber = bonusNumber
  }

  matchedWinningCount(lotto){
    return this.#winningLotto.numbers.filter((number) => lotto.hasNumber(number)).length;
  }

  isBonusMatched(lotto) {
    return lotto.hasNumber(this.#bonusNumber);
  }
}

export default WinningLotto;
