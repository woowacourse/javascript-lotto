import { LOTTO, MIN_MATCH_COUNT } from "../config/const.js";

class LottoPrize {
  #lottos;

  constructor(lottos) {
    this.#lottos = lottos;
  }

  calculateWinnings(winningNumbers, bonusNumber) {
    const matchingCountResult = this.#calculateMatchingCount(winningNumbers);
    const bonusChanceResult = this.#calculateBonusChance(bonusNumber);
    return matchingCountResult.reduce(
      (acc, curr, index) => {
        acc[this.#determineMatchResult(curr, bonusChanceResult[index])] += 1;
        return acc;
      },
      {
        6: 0,
        "5+bonus": 0,
        5: 0,
        4: 0,
        3: 0,
      }
    );
  }

  calculateROI(price, prizeResult) {
    if (this.#calculateTotalPrize(prizeResult) === 0) return 0;

    return (
      ((this.#calculateTotalPrize(prizeResult) - price) / price) *
      100
    ).toFixed(2);
  }

  #calculateMatchingCount(winningNumbers) {
    return this.#lottos.reduce((acc, curr) => {
      const matchingCount = curr.compareMatchingNumbers(winningNumbers);
      return matchingCount < MIN_MATCH_COUNT ? acc : [...acc, matchingCount];
    }, []);
  }

  #calculateBonusChance(bonusNumber) {
    return this.#lottos.reduce((acc, curr) => {
      const isBonus = curr.compareBonusNumbers(bonusNumber);
      return [...acc, isBonus];
    }, []);
  }

  #determineMatchResult(matchCount, bonusMatchResult) {
    if (matchCount === 5 && bonusMatchResult) {
      return "5+bonus";
    }
    return matchCount;
  }

  #calculateTotalPrize(prizeResult) {
    return Object.keys(prizeResult).reduce((acc, curr) => {
      switch (curr) {
        case "6":
          return acc + LOTTO.PRIZES.first * prizeResult[curr];
        case "5+bonus":
          return acc + LOTTO.PRIZES.second * prizeResult[curr];
        case "5":
          return acc + LOTTO.PRIZES.third * prizeResult[curr];
        case "4":
          return acc + LOTTO.PRIZES.fourth * prizeResult[curr];
        case "3":
          return acc + LOTTO.PRIZES.fifth * prizeResult[curr];
      }
    }, 0);
  }
}

export default LottoPrize;
