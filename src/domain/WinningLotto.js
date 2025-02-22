import validateBonusNumber from "../validations/validate/validateBonusNumber.js";

class WinningLotto {
  #winningLotto;
  #bonusNumber;

  constructor(winningLotto, bonusNumber) {
    this.#winningLotto = winningLotto
    this.#bonusNumber = bonusNumber
    validateBonusNumber(this.#winningLotto, this.#bonusNumber);
  }

  matchedWinningCount(lotto){
    return this.#winningLotto.numbers.filter((number) => lotto.hasNumber(number)).length;
  }

  isBonusMatched(lotto) {
    return lotto.hasNumber(this.#bonusNumber);
  }
}

export default WinningLotto;
