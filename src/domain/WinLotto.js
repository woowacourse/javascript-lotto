const Lotto = require("./Lotto");

const prize = { 1: 2000000000, 2: 30000000, 3: 1500000, 4: 50000, 5: 5000 };

class WinLotto extends Lotto {
  #bonusNumber;

  constructor(numbers, bonusNumber) {
    super(numbers);
    this.#bonusNumber = bonusNumber;
  }

  calculateWinLotto(lottos, rankResult) {
    lottos.forEach((lotto) => {
      const rank = this.calculateRank(lotto);
      rankResult[rank] += 1;
    });

    return rankResult;
  }

  calculateRank(lotto) {
    const sameNumbers = lotto.numbers.filter((num) =>
      super.numbers.includes(num)
    );
    if (sameNumbers.length === 6) return 1;
    if (sameNumbers.length === 5)
      return lotto.numbers.includes(this.bonusNumber) ? 2 : 3;
    if (sameNumbers.length === 4) return 4;
    if (sameNumbers.length === 3) return 5;
    if (sameNumbers.length < 3) return 0;
  }

  calculateRevenue(rankResult, lottoCount) {
    const revenue = Object.keys(prize).reduce(
      (result, current) => result + prize[current] * rankResult[current],
      0
    );

    return (revenue / (lottoCount * 10)).toFixed(1);
  }

  get bonusNumber() {
    return this.#bonusNumber;
  }
}

module.exports = WinLotto;
