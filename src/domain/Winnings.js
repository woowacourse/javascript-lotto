import DEFINITION from "../constant/definition.js";

export default class Winnings {
  constructor(numbers, bonusNumber) {
    this.validateUniqueNumbers(numbers);
    this.validateNumbersRange(numbers);
    this.validateBonusNumberInNumbers(numbers, bonusNumber);
    this.validateNaturalNumbers(numbers);
    this.validateNaturalBonusNumber(bonusNumber);
    this.validateRangeBonusNumber(bonusNumber);
    this.numbers = numbers;
    this.bonusNumber = bonusNumber;
  }

  validateUniqueNumbers(numbers) {
    const setNumbers = new Set(numbers);
    if (setNumbers.size !== numbers.length) throw new Error();
  }

  validateNumbersRange(numbers) {
    const isRange = numbers.every((number) => number >= 1 && number <= 45);
    if (!isRange) throw new Error();
  }

  validateBonusNumberInNumbers(numbers, bonusNumber) {
    if (numbers.includes(bonusNumber)) throw new Error();
  }

  validateNaturalNumbers(numbers) {
    if (numbers.some((number) => number % 1 !== 0)) throw new Error();
  }

  validateNaturalBonusNumber(bonusNumber) {
    if (bonusNumber % 1 !== 0) throw new Error();
  }

  validateRangeBonusNumber(bonusNumber) {
    if (bonusNumber > 45 || bonusNumber < 1) throw new Error();
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
