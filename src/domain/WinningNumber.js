import Lotto from "./Lotto.js";

class WinningNumber {
  static ERROR = Object.freeze({
    INVALID_RANGE: `[ERROR] 보너스 번호는 ${Lotto.MIN_RANGE}~${Lotto.MAX_RANGE} 사이의 숫자여야 합니다.`,
    DUPLICATE: "[ERROR] 보너스 번호는 당첨 번호와 중복될 수 없습니다.",
  });

  #winningLotto;
  #bonusNumber;

  constructor(lotto, bonusNumber) {
    this.#validate(lotto, bonusNumber);
    this.#winningLotto = lotto;
    this.#bonusNumber = bonusNumber;
  }

  #validate(lotto, bonusNumber) {
    if (bonusNumber < Lotto.MIN_RANGE || bonusNumber > Lotto.MAX_RANGE) {
      throw new Error(WinningNumber.ERROR.INVALID_RANGE);
    }
    if (lotto.hasNumber(bonusNumber)) {
      throw new Error(WinningNumber.ERROR.DUPLICATE);
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
