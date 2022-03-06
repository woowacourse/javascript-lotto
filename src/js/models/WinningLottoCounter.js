import { INITIAL_WINNING_COUNTS, INITIAL_WINNING_LOTTO, PRIZE_MONEY } from '../constants/setting';

export default class WinningLottoCounter {
  #winningCounts;
  #winningLotto;

  constructor() {
    this.#winningCounts = { ...INITIAL_WINNING_COUNTS };
    this.#winningLotto = { ...INITIAL_WINNING_LOTTO };
  }

  get winningCounts() {
    return this.#winningCounts;
  }

  setWinningLotto(winningLotto) {
    this.#winningLotto.lottoNumbers = [...winningLotto.lottoNumbers];
    this.#winningLotto.bonusNumber = winningLotto.bonusNumber;
  }

  calculateWinningCounts(boughtLottos) {
    const tempWinningCounts = { ...INITIAL_WINNING_COUNTS };

    boughtLottos.forEach((lotto) => {
      const hitCount = this.#winningLotto.winningNumbers.filter((num) =>
        lotto.includes(num)
      ).length;
      const isBonusHit = lotto.includes(this.#winningLotto.bonusNumber);

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
      (total, [rank, count]) => (total += PRIZE_MONEY[rank] * count),
      0
    );

    return earnedMoney ? Math.round(((earnedMoney - chargedMoney) / chargedMoney) * 100) : -100;
  }

  reset() {
    this.#winningCounts = { ...INITIAL_WINNING_COUNTS };
    this.#winningLotto = { ...INITIAL_WINNING_LOTTO };
  }
}
