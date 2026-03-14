import Lotto from "./Lotto.js";
import { LOTTO_RULES } from "../Utils/Constants.js";

class LuckyNumbers {
  #winningLotto;
  #bonusNumber;

  constructor(winningNumbers, bonusNumber) {
    this.#winningLotto = new Lotto(winningNumbers);
    this.#bonusNumber = this.#validateBonusNumber(bonusNumber);
  }

  #validateBonusNumber(bonusNumber) {
    const bonus = Number(bonusNumber.trim());

    if (Number.isNaN(bonus) || bonus < LOTTO_RULES.MIN_NUMBER || bonus > LOTTO_RULES.MAX_NUMBER) {
      throw new Error(`[ERROR] 보너스 번호는 ${LOTTO_RULES.MIN_NUMBER}~${LOTTO_RULES.MAX_NUMBER} 범위의 숫자여야 합니다!`);
    }

    const winningNumbersNum = this.#winningLotto.getNumbers().map(Number);
    if (winningNumbersNum.includes(bonus)) {
      throw new Error("[ERROR] 보너스 번호가 당첨번호와 중복됩니다!");
    }

    return bonus;
  }

  winningNumbers() { return this.#winningLotto.getNumbers(); }
  bonusNumber() { return this.#bonusNumber; }
}

export default LuckyNumbers;