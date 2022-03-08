import { LOTTO_RULES, PRIZE_MONEY } from '../constant/index.js';

const INITIAL_WINNING_COUNTS = {
  '5등': 0,
  '4등': 0,
  '3등': 0,
  '2등': 0,
  '1등': 0,
};

class LottoStatisticMachine {
  #winningNumbers = new Array(LOTTO_RULES.BALL_COUNT).fill(0);

  #bonusNumber = 0;

  #winningCounts = INITIAL_WINNING_COUNTS;

  #earningsRate = 0;

  calculateWinningCounts(lottos, winningNumbers, bonusNumber) {
    this.#winningNumbers = winningNumbers;
    this.#bonusNumber = bonusNumber;

    lottos.forEach((lotto) => {
      const hitCount = this.#calculateHitCount(lotto);
      const isHitBonusNumber = this.#checkHitBonusNumber(lotto);

      if (hitCount >= 3) {
        const rank = this.#convertHitCountToRank(hitCount, isHitBonusNumber);

        this.#winningCounts[rank] += 1;
      }
    });

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
    this.#winningCounts = INITIAL_WINNING_COUNTS;
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
      return '5등';
    }

    if (hitCount === 4) {
      return '4등';
    }

    if (hitCount === 5) {
      if (isHitBonusNumber) {
        return '2등';
      }

      return '3등';
    }

    return '1등';
  }

  #calculateEarnings(winningCounts) {
    return Object.values(winningCounts).reduce(
      (earnings, winningCount, index) => earnings + PRIZE_MONEY[index] * winningCount,
      0,
    );
  }
}

const lottoStatisticMachine = new LottoStatisticMachine();

export default lottoStatisticMachine;
