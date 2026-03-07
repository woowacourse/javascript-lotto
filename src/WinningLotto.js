import Lotto from "./Lotto.js";

class WinningLotto extends Lotto {
  constructor(numbers, bonus) {
    super(numbers);
    this.bonusNumber = bonus;
  }

  getBonusNumber() {
    return this.bonusNumber;
  }

  getRank(lotto) {
    const matchingCount = lotto
      .getNumbers()
      .filter((x) => this.getNumbers().includes(x)).length;

    const isBonus = lotto.getNumbers().includes(this.bonusNumber);

    if (matchingCount === 6) return 1;
    if (matchingCount === 5 && isBonus) return 2;
    if (matchingCount === 5) return 3;
    if (matchingCount === 4) return 4;
    if (matchingCount === 3) return 5;
    return null;
  }
}

export default WinningLotto;
