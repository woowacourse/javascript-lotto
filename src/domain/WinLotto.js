const Lotto = require("./Lotto");

const Price = { 1: 2000000000, 2: 30000000, 3: 1500000, 4: 50000, 5: 50000 };

class WinLotto extends Lotto {
  #bonusNumber;

  constructor(numbers) {
    super(numbers);
  }
  set bonusNumber(bonusNumber) {
    this.#bonusNumber = bonusNumber;
  }

  //calculateWinLotto(lottos){
  // const sameNumbers = lottos.map((lotto)=> {
  //     sameNumber = lotto.numbers.filter(num => super.numbers.includes(num));

  //     return sameNumber.length;
  // });
  // }
  //}
  calculateWinLotto(lottos) {
    lottos.forEach((lotto) => {
      const rank = this.calculateRank(lotto.numbers);
      RevenueResult[rank] += 1;
    });

    return;
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

  get bonusNumber() {
    return this.#bonusNumber;
  }
}

module.exports = WinLotto;
