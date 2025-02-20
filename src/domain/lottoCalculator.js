const matchToRankTable = {
  "3_false": 5,
  "3_true": 5,
  "4_false": 4,
  "4_true": 4,
  "5_false": 3,
  "5_true": 2,
  "6_false": 1,
  "6_true": 1,
};

const rankInfoTable = {
  1: { price: 2_000_000_000, message: "6개 일치" },
  2: { price: 30_000_000, message: "5개 일치, 보너스 볼 일치" },
  3: { price: 1_500_000, message: "5개 일치" },
  4: { price: 50_000, message: "4개 일치" },
  5: { price: 5_000, message: "3개 일치" },
};

class LottoCalculator {
  #winningNumbers;
  #bonusNumber;
  #prize;
  #totalPrice;

  constructor(winningNumbers, bonusNumber) {
    this.#winningNumbers = winningNumbers;
    this.#bonusNumber = bonusNumber;
    this.#prize = new Map([
      [1, []],
      [2, []],
      [3, []],
      [4, []],
      [5, []],
    ]);
  }

  calculatePrize(lotto) {
    const matchCount = lotto.countNumbersMatch(this.#winningNumbers);
    const isMatchBonus = lotto.isMatch(this.#bonusNumber);
    const tableKey = `${matchCount}_${isMatchBonus}`;

    if (matchCount >= 3) {
      const rank = matchToRankTable[tableKey];
      this.#prize.set(rank, [...this.#prize.get(rank), lotto]);
    }
  }

  calculateTotalPrice() {
    let totalPrice = 0;
    this.#prize.forEach((value, rank) => {
      const info = rankInfoTable[rank];
      totalPrice += info.price * value.length;
    });

    this.#totalPrice = totalPrice;
  }

  get prize() {
    return this.#prize;
  }

  get totalPrice() {
    return this.#totalPrice;
  }
}

export default LottoCalculator;
