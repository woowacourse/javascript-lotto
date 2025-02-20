import {
  FIFTH_PRIZE,
  FIRST_PRIZE,
  FOURTH_PRIZE,
  SECOND_PRIZE,
  THIRD_PRIZE,
} from "./const.js";

class LottoPrizeManager {
  #countResults;
  #isContainBonusNumbers;
  #prizeResult;

  constructor(countResults, isContainBonusNumbers) {
    this.#countResults = countResults;
    this.#isContainBonusNumbers = isContainBonusNumbers;
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
      let isBonusNumber;
      if (cur === 5) isBonusNumber = this.#isContainBonusNumbers.shift();
      acc[this.#switchCountToPrize(cur, isBonusNumber)] += 1;
      return acc;
    }, this.#prizeResult);
  }

  calculateROI(price) {
    return (((this.#calculateTotalPrize() - price) / price) * 100).toFixed(2);
  }

  #switchCountToPrize(countResult, isBonusNumber) {
    switch (countResult) {
      case 3:
        return "fifthPrize";
      case 4:
        return "fourthPrize";
      case 5:
        if (isBonusNumber) return "secondPrize";
        return "thirdPrize";
      case 6:
        return "firstPrize";
    }
  }

  #calculateTotalPrize() {
    return Object.keys(this.#prizeResult).reduce((acc, curr) => {
      switch (curr) {
        case "firstPrize":
          return acc + FIRST_PRIZE * this.#prizeResult[curr];
        case "secondPrize":
          return acc + SECOND_PRIZE * this.#prizeResult[curr];
        case "thirdPrize":
          return acc + THIRD_PRIZE * this.#prizeResult[curr];
        case "fourthPrize":
          return acc + FOURTH_PRIZE * this.#prizeResult[curr];
        case "fifthPrize":
          return acc + FIFTH_PRIZE * this.#prizeResult[curr];
      }
    }, 0);
  }
}

export default LottoPrizeManager;
