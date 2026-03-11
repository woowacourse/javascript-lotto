import Lotto from "./Lotto.js";

class WinningNumber {
  #winningLotto;
  #bonusNumber;

  constructor(winningLotto, bonusNumber) {
    this.#validate(winningLotto, bonusNumber);
    this.#winningLotto = winningLotto;
    this.#bonusNumber = bonusNumber;
  }

  #validate(lotto, bonusNumber) {
    if (bonusNumber < Lotto.MIN_RANGE || bonusNumber > Lotto.MAX_RANGE) {
      throw new Error(
        `[ERROR] 보너스 번호는 ${Lotto.MIN_RANGE}~${Lotto.MAX_RANGE} 사이의 숫자여야 합니다.`,
      );
    }
    if (lotto.hasNumber(bonusNumber)) {
      throw new Error("[ERROR] 보너스 번호는 당첨 번호와 중복될 수 없습니다.");
    }
  }

  getNumbers() {
    return this.#winningLotto.getNumbers();
  }

  getBonusNumber() {
    return this.#bonusNumber;
  }
}

export default WinningNumber;
