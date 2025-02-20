import {
  FIFTH_PRIZE,
  FIRST_PRIZE,
  FOURTH_PRIZE,
  PURCHASE_UNIT,
  SECOND_PRIZE,
  THIRD_PRIZE,
} from "./const.js";
import Lotto from "./Lotto.js";

class LottoManager {
  #userLottos;
  #winningNumber;
  #bonusNumber;
  #prizeResult;

  constructor(userLottos, winningNumber, bonusNumber) {
    this.#userLottos = userLottos;
    this.#winningNumber = winningNumber;
    this.#bonusNumber = bonusNumber;
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

  #compareMatchingNumbers(userLotto) {
    return userLotto.reduce((acc, lottoNumber) => {
      if (this.#winningNumber.includes(lottoNumber)) {
        acc += 1;
      }
      return acc;
    }, 0);
  }

  countMatchingNumbers() {
    const countResults = [];

    this.#userLottos.forEach((userLotto) => {
      const matchingCount = this.#compareMatchingNumbers(userLotto.numbers);
      if (matchingCount >= 3) countResults.push(matchingCount);
    });

    return countResults;
  }

  containsBonusNumbers(countResults) {
    const isContainBonusInFive = countResults.reduce((acc, cur, index) => {
      if (cur === 5) {
        acc.push(this.#userLottos[index].numbers.includes(this.#bonusNumber));
      }
      return acc;
    }, []);
    return isContainBonusInFive;
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

  calculateWinnings(countResults, isContainBonusNumbers) {
    countResults.reduce((acc, cur) => {
      let isBonusNumber;
      if (cur === 5) isBonusNumber = isContainBonusNumbers.shift();
      acc[this.#switchCountToPrize(cur, isBonusNumber)] += 1;
      return acc;
    }, this.#prizeResult);
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

  calculateROI(price) {
    return (((this.#calculateTotalPrize() - price) / price) * 100).toFixed(2);
  }
}

export default LottoManager;
