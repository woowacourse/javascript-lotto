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
    boutghtLottos.forEach((lotto) => {
      let hitCount = this.#winningLotto.winningNumbers.reduce((acc, num) => {
        if (lotto.has(num)) {
          acc += 1;
        }
        return acc;
      }, 0);
      const isBonusHit = lotto.has(this.#winningLotto.bonusNumber);
      hitCount = hitCount !== 6 ? hitCount - 1 : hitCount;
      hitCount = hitCount === 5 && isBonusHit ? hitCount + 1 : hitCount;
      if (hitCount >= 2) {
        this.#winningCounts[`${7 - hitCount}th`] += 1;
      }
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
