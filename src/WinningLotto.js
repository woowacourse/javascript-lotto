import Lotto from "./Lotto";

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
      .filter((x) => this.numbers.includes(x)).length;

    const isBonus = lotto.getNumbers().includes(this.bonusNumber);

    if (matchingCount === 6) return 1;
    if (matchingCount === 5 && isBonus) return 2;
    if (matchingCount === 5) return 3;
    if (matchingCount === 4) return 4;
    if (matchingCount === 3) return 5;
    return null;
  }

  getPrizeList(purchasedLottos) {
    const prizeList = [0, 0, 0, 0, 0, 0];
    purchasedLottos.forEach((lotto) => {
      const rank = this.getRank(lotto);
      if (rank !== null) prizeList[rank]++;
    });
    return prizeList;
  }
}

export default WinningLotto;
