import countMatchingNumbers from "../utils/countMatchingNumbers.js";
import { MATCH_KEY, MATCH_PRIZE } from "../constants/constants.js";
class WinningStatistics {
  #statistics = new Map([
    [MATCH_KEY.THREE, { count: 0, amount: MATCH_PRIZE.THREE }],
    [MATCH_KEY.FOUR, { count: 0, amount: MATCH_PRIZE.FOUR }],
    [MATCH_KEY.FIVE, { count: 0, amount: MATCH_PRIZE.FIVE }],
    [
      MATCH_KEY.FIVE_AND_BONUS,
      { count: 0, amount: MATCH_PRIZE.FIVE_AND_BONUS },
    ],
    [MATCH_KEY.SIX, { count: 0, amount: MATCH_PRIZE.SIX }],
  ]);

  get statistics() {
    return this.#statistics;
  }

  calculateProfitRatio(purchaseAmount) {
    const profitAmount = Array.from(this.#statistics.values()).reduce(
      (sum, { count, amount }) => sum + count * amount,
      0,
    );
    const PERCENTAGE = 100;
    const DECIMAL_POINT = 1;
    return ((profitAmount / purchaseAmount) * PERCENTAGE).toFixed(
      DECIMAL_POINT,
    );
  }

  calculateWinningResults(lottos, winningNumbers, bonusNumber) {
    lottos.forEach((lotto) => {
      const matchedCount = countMatchingNumbers(winningNumbers, lotto);
      if (matchedCount === MATCH_KEY.FIVE) {
        this.#addMatchedCount(this.#calculateBonusNumber(lotto, bonusNumber));
        return;
      }
      this.#addMatchedCount(matchedCount);
    });
  }

  #calculateBonusNumber(lotto, bonusNumber) {
    if (lotto.includes(bonusNumber)) return MATCH_KEY.FIVE_AND_BONUS;
    return MATCH_KEY.FIVE;
  }

  #addMatchedCount(matchedCount) {
    if (matchedCount >= MATCH_KEY.THREE) {
      this.#statistics.set(matchedCount, {
        ...this.#statistics.get(matchedCount),
        count: this.#statistics.get(matchedCount).count + 1,
      });
    }
  }
}

export default WinningStatistics;
