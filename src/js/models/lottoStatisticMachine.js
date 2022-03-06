import { LOTTO_RULES, PRIZE_MONEY } from '../constant/index.js';

class LottoStatisticMachine {
  #winningNumbers = new Array(LOTTO_RULES.BALL_COUNT).fill(0);

  #bonusNumber = 0;

  #winningCounts = new Array(5).fill(0);

  #earningsRate = 0;

  calculateWinningCounts(lottos, winningNumbers, bonumsNumber) {
    this.#winningNumbers = winningNumbers;
    this.#bonusNumber = bonumsNumber;

    const winningCounts = new Array(5).fill(0);

    lottos.forEach((lotto) => {
      const hitCount = this.#calculateHitCount(lotto);
      const isHitBonusNumber = this.#checkHitBonusNumber(lotto);

      if (hitCount >= 3) {
        const rank = this.#convertHitCountToRank(hitCount, isHitBonusNumber);

        winningCounts[rank - 1] += 1;
      }
    });

    this.#winningCounts = winningCounts.reverse();
    return this.#winningCounts;
  }

  calculateEarningsRate(fare, winningCounts) {
    const earnings = this.#calculateEarnings(winningCounts);

    this.#earningsRate = ((earnings - fare) * 100) / fare;
    return this.#earningsRate;
  }

  reset() {
    this.#winningNumbers = new Array(LOTTO_RULES.BALL_COUNT).fill(0);
    this.#bonusNumber = 0;
    this.#winningCounts = new Array(5).fill(0);
    this.#earningsRate = 0;
  }

  #calculateHitCount(lotto) {
    return lotto.reduce((hitCount, lottoNumber) => {
      if (this.#winningNumbers.includes(lottoNumber)) {
        return hitCount + 1;
      }

      return hitCount;
    }, 0);
  }

  #checkHitBonusNumber(lotto) {
    return lotto.includes(this.#bonusNumber);
  }

  #convertHitCountToRank(hitCount, isHitBonusNumber) {
    if (hitCount === 3) {
      return 5;
    }

    if (hitCount === 4) {
      return 4;
    }

    if (hitCount === 5) {
      if (isHitBonusNumber) {
        return 2;
      }

      return 3;
    }

    return 1;
  }

  #calculateEarnings(winningCounts) {
    return winningCounts.reduce(
      (earnings, winningCount, index) => earnings + PRIZE_MONEY[index] * winningCount,
      0,
    );
  }
}

const lottoStatisticMachine = new LottoStatisticMachine();

export default lottoStatisticMachine;
