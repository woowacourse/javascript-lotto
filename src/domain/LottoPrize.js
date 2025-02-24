import { LOTTO, MIN_MATCH_COUNT } from "../config/const.js";

class LottoPrize {
  #prizeResult;
  #lottos;

  constructor(lottos) {
    this.#lottos = lottos;
    this.#prizeResult = {
      firstPrize: 0,
      secondPrize: 0,
      thirdPrize: 0,
      fourthPrize: 0,
      fifthPrize: 0,
    };
  }

  get prizeResult() {
    return this.#prizeResult;
  }

  calculateWinnings(winningNumbers, bonusNumber) {
    const countResults = this.#calculateMatchingCount(
      winningNumbers,
      bonusNumber
    );
    countResults.reduce((acc, cur) => {
      acc[this.#switchCountToPrize(cur)] += 1;
      return acc;
    }, this.#prizeResult);
  }

  calculateROI(price) {
    if (this.#calculateTotalPrize() === 0) return 0;
    return (((this.#calculateTotalPrize() - price) / price) * 100).toFixed(2);
  }

  #calculateMatchingCount(winningNumbers, bonusNumber) {
    return this.#lottos.reduce((acc, curr) => {
      const matchingCount = curr.compareMatchingNumbers(winningNumbers);
      const isBonus = curr.compareBonusNumbers(bonusNumber);

      return matchingCount < MIN_MATCH_COUNT
        ? acc
        : [...acc, matchingCount === 5 && isBonus ? "bonus" : matchingCount];
    }, []);
  }

  #switchCountToPrize(countResult) {
    switch (countResult) {
      case 3:
        return "fifthPrize";
      case 4:
        return "fourthPrize";
      case 5:
        return "thirdPrize";
      case "bonus":
        return "secondPrize";
      case 6:
        return "firstPrize";
    }
  }

  #calculateTotalPrize() {
    return Object.keys(this.#prizeResult).reduce((acc, curr) => {
      switch (curr) {
        case "firstPrize":
          return acc + LOTTO.PRIZES.first * this.#prizeResult[curr];
        case "secondPrize":
          return acc + LOTTO.PRIZES.second * this.#prizeResult[curr];
        case "thirdPrize":
          return acc + LOTTO.PRIZES.third * this.#prizeResult[curr];
        case "fourthPrize":
          return acc + LOTTO.PRIZES.fourth * this.#prizeResult[curr];
        case "fifthPrize":
          return acc + LOTTO.PRIZES.fifth * this.#prizeResult[curr];
      }
    }, 0);
  }
}

export default LottoPrize;
