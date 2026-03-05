import Lotto from "./Lotto.js";

class WinningNumber {
  #winningLotto;
  #bonusNumber;

  constructor(lotto, bonusNumber) {
    this.#validate(lotto, bonusNumber);
    this.#winningLotto = lotto;
    this.#bonusNumber = bonusNumber;
  }

  #validate(lotto, bonusNumber) {
    if (lotto.hasNumber(bonusNumber)) {
      throw new Error("[ERROR]");
    }
  }

  getResult(lotto) {
    const matchLottoCount = this.#winningLotto
      .getNumbers()
      .filter((num) => lotto.hasNumber(num)).length;
    const hasBonusNumber = lotto.hasNumber(this.#bonusNumber);
    return { matchCount: matchLottoCount, hasBonus: hasBonusNumber };
  }
}

export default WinningNumber;
