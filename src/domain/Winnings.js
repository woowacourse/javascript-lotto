import DEFINITION from "../constant/definition.js";
import Validator from "./Validator.js";

export default class Winnings {
  constructor(numbers, bonusNumber) {
    this.validateWinnings(numbers);
    this.validateBonusNumber(bonusNumber);
    this.validateWinningsAndBonus(numbers, bonusNumber);
    this.numbers = numbers;
    this.bonusNumber = bonusNumber;
  }

  validateWinnings(numbers) {
    const errorResults = Validator.winningNumbers(numbers);
    if (Object.values(errorResults).some((value) => value)) throw new Error();
  }

  validateBonusNumber(bonusNumber) {
    const errorResults = Validator.bonusNumber(bonusNumber);
    if (Object.values(errorResults).some((value) => value)) throw new Error();
  }

  validateWinningsAndBonus(numbers, bonusNumber) {
    const errorResults = Validator.winningsAndBonus(numbers, bonusNumber);
    if (Object.values(errorResults).some((value) => value)) throw new Error();
  }

  countStatistics(lottos) {
    const counter = {
      "1등": 0,
      "2등": 0,
      "3등": 0,
      "4등": 0,
      "5등": 0,
    };

    lottos.forEach((lotto) => {
      this.#judgeRank(lotto, counter);
    });

    return counter;
  }

  #judgeRank(lotto, counter) {
    const matchCount = this.#getMatchCount(lotto);
    if (this.#isBonusWinning(matchCount, lotto)) return counter["2등"]++;
    switch (matchCount) {
      case 3:
        counter["5등"]++;
        break;
      case 4:
        counter["4등"]++;
        break;
      case 5:
        counter["3등"]++;
        break;
      case 6:
        counter["1등"]++;
        break;
    }
  }

  #isBonusWinning(matchCount, lotto) {
    if (matchCount === 5 && lotto.includes(this.bonusNumber)) return true;
    return false;
  }

  #getMatchCount(lotto) {
    const sumNumbers = [...lotto, ...this.numbers];
    const setLotto = new Set(sumNumbers);

    return sumNumbers.length - setLotto.size;
  }

  calculateWinningRate(statistics, money) {
    const sum = Object.entries(statistics).reduce((acc, [key, count]) => {
      return acc + DEFINITION.LOTTO_PRISE[key] * count;
    }, 0);
    return (sum / money) * 100;
  }
}
