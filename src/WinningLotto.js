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
    const matchingCount = this.#countMatches(lotto);

    const isBonus = this.#isBonus(lotto);

    if (matchingCount === 6) return 1;
    if (matchingCount === 5 && isBonus) return 2;
    if (matchingCount === 5) return 3;
    if (matchingCount === 4) return 4;
    if (matchingCount === 3) return 5;
    return null;
  }

  #countMatches(lotto) {
    return lotto.getNumbers().filter((x) => this.numbers.includes(x)).length;
  }

  #isBonus(lotto) {
    return lotto.getNumbers().includes(this.bonusNumber);
  }
}

export default WinningLotto;
