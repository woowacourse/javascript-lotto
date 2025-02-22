import { PRIZE } from "../config/const.js";

class LottoPrize {
  #countResults;
  #prizeResult;

  constructor(countResults) {
    this.#countResults = countResults;
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

  calculateWinnings() {
    this.#countResults.reduce((acc, cur) => {
      acc[this.#switchCountToPrize(cur)] += 1;
      return acc;
    }, this.#prizeResult);
  }

  calculateROI(price) {
    if (this.#calculateTotalPrize() === 0) return 0;
    return (((this.#calculateTotalPrize() - price) / price) * 100).toFixed(2);
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
