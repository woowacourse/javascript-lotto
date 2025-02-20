import DEFINITION from "../constant/Definition.js";
import Validator from "./Validator.js";
import { RANK } from "../constant/Definition.js";

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
      [RANK.FIFTH]: 0,
      [RANK.FOURTH]: 0,
      [RANK.THIRD]: 0,
      [RANK.SECOND]: 0,
      [RANK.FIRST]: 0,
    };

    lottos.forEach((lotto) => {
      this.#judgeRank(lotto, counter);
    });

    return counter;
  }

  #judgeRank(lotto, counter) {
    const matchCount = this.#getMatchCount(lotto);
    if (this.#isBonusWinning(matchCount, lotto)) return counter[RANK.SECOND]++;
    switch (matchCount) {
      case 3:
        counter[RANK.FIFTH]++;
        break;
      case 4:
        counter[RANK.FOURTH]++;
        break;
      case 5:
        counter[RANK.THIRD]++;
        break;
      case 6:
        counter[RANK.FIRST]++;
        break;
    }
  }

  #isBonusWinning(matchCount, lotto) {
    if (
      matchCount === DEFINITION.LOTTO_RULE[RANK.SECOND] &&
      lotto.includes(this.bonusNumber)
    )
      return true;
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
