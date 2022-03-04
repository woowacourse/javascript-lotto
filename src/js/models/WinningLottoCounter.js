const winningCountsInit = {
  '1th': 0,
  '2th': 0,
  '3th': 0,
  '4th': 0,
  '5th': 0,
};

const prizeMoney = {
  '1th': 2000000000,
  '2th': 30000000,
  '3th': 1500000,
  '4th': 50000,
  '5th': 5000,
};

const winningLottoInit = {
  winningNumbers: [],
  bonusNumber: null,
};

export default class WinningLottoCounter {
  #winningCounts;
  #winningLotto;

  constructor() {
    this.#winningCounts = { ...winningCountsInit };
    this.#winningLotto = { ...winningLottoInit };
  }

  get winningCounts() {
    return this.#winningCounts;
  }

  setWinningLotto({ winningNumbers, bonusNumber }) {
    this.#winningLotto.winningNumbers = [...winningNumbers];
    this.#winningLotto.bonusNumber = bonusNumber;
  }

  calculateWinningCounts(boutghtLottos) {
    const tempWinningCounts = { ...winningCountsInit };
    boutghtLottos.forEach((lotto) => {
      const hitCount = this.#winningLotto.winningNumbers.reduce(
        (acc, num) => acc + lotto.has(num),
        0
      );
      const isBonusHit = lotto.has(this.#winningLotto.bonusNumber);
      let rank = 7 - hitCount;
      rank = hitCount === 5 && isBonusHit ? rank : rank + 1;
      if (rank <= 5) {
        tempWinningCounts[`${rank}th`] += 1;
      }
      this.#winningCounts = { ...tempWinningCounts };
    });
  }

  getProfitRate(chargedMoney) {
    const earnedMoney = Object.entries(this.#winningCounts).reduce(
      (total, [rank, count]) => (total += prizeMoney[rank] * count),
      0
    );
    return earnedMoney ? Math.round(((earnedMoney - chargedMoney) / chargedMoney) * 100) : -100;
  }

  reset() {
    this.#winningCounts = winningCountsInit;
    this.#winningLotto = winningLottoInit;
  }
}
