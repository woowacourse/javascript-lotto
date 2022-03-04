import { winningCountsInit, winningLottoInit, prizeMoney } from '../constants/setting';

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

  setWinningLotto(winningLotto) {
    this.#winningLotto.winningNumbers = [...winningLotto.winningNumbers];
    this.#winningLotto.bonusNumber = winningLotto.bonusNumber;
  }

  calculateWinningCounts(boutghtLottos) {
    const tempWinningCounts = { ...winningCountsInit };
    boutghtLottos.forEach((lotto) => {
      const hitCount = this.#winningLotto.winningNumbers.filter((num) => lotto.has(num)).length;
      const isBonusHit = lotto.has(this.#winningLotto.bonusNumber);
      let rank = 7 - hitCount;
      rank = (hitCount === 5 && isBonusHit) || hitCount === 6 ? rank : rank + 1;
      if (rank <= 5) {
        tempWinningCounts[`${rank}th`] += 1;
      }
    });
    this.#winningCounts = { ...tempWinningCounts };
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
