import { PRIZE } from "../config/const.js";

class LottoPrize {
  #prizeResult;

  constructor() {
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

  calculateTotalPrizeCount(compareResult) {
    compareResult.forEach(({ matchCount, hasBonus }) => {
      if (matchCount === 6) ++this.#prizeResult.firstPrize;
      else if (matchCount === 5 && hasBonus) ++this.#prizeResult.secondPrize;
      else if (matchCount === 5 && !hasBonus) ++this.#prizeResult.thirdPrize;
      else if (matchCount === 4) ++this.#prizeResult.fourthPrize;
      else if (matchCount === 3) ++this.#prizeResult.fifthPrize;
    });
  }

  calculateROI(price) {
    if (this.#calculateTotalPrize() === 0) return 0;
    return (((this.#calculateTotalPrize() - price) / price) * 100).toFixed(2);
  }

  #calculateTotalPrize() {
    return Object.keys(this.#prizeResult).reduce((acc, curr) => {
      switch (curr) {
        case "firstPrize":
          return acc + PRIZE.FIRST * this.#prizeResult[curr];
        case "secondPrize":
          return acc + PRIZE.SECOND * this.#prizeResult[curr];
        case "thirdPrize":
          return acc + PRIZE.THIRD * this.#prizeResult[curr];
        case "fourthPrize":
          return acc + PRIZE.FOURTH * this.#prizeResult[curr];
        case "fifthPrize":
          return acc + PRIZE.FIFTH * this.#prizeResult[curr];
      }
    }, 0);
  }
}

export default LottoPrize;
