class WinningLotto {
  #winningLotto;
  #bonusNumber;

  constructor(winningLotto, bonusNumber) {
    this.#winningLotto = winningLotto
    this.#bonusNumber = bonusNumber
  }

  matchedWinningCount(lotto){
    return this.#winningLotto.numbers.filter((number) => lotto.isContained(number)).length;
  }

  isBonusMatched(lotto) {
    return lotto.isContained(this.#bonusNumber);
  }
}

export default WinningLotto;
