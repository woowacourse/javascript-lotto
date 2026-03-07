import Lotto from "./Lotto.js";

class WinningLotto extends Lotto {
  #bonusNumber;

  constructor(numbers, bonus) {
    super(numbers);
    this.#validateBonusNumber(numbers, bonus);
    this.#bonusNumber = bonus;
  }

  #validateBonusNumber(winningNumbers, bonusNumber) {
    if (bonusNumber < 1 || bonusNumber > 45)
      throw new Error("[ERROR] 보너스 번호는 1~45 사이여야 합니다.");
    if (winningNumbers.includes(bonusNumber))
      throw new Error("[ERROR] 보너스 번호는 당첨 번화와 중복될 수 없습니다.");
  }

  getBonusNumber() {
    return this.#bonusNumber;
  }

  getRank(lotto) {
    const matchingCount = lotto
      .getNumbers()
      .filter((x) => this.getNumbers().includes(x)).length;

    const isBonus = lotto.getNumbers().includes(this.#bonusNumber);

    if (matchingCount === 6) return 1;
    if (matchingCount === 5 && isBonus) return 2;
    if (matchingCount === 5) return 3;
    if (matchingCount === 4) return 4;
    if (matchingCount === 3) return 5;
    return null;
  }
}

export default WinningLotto;
