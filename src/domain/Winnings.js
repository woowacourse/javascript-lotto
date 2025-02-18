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
      3: 0,
      4: 0,
      5: 0,
      6: 0,
      7: 0,
    };

    lottos.forEach((lotto) => {
      const sumNumbers = [...lotto, ...this.numbers];
      const setLotto = new Set(sumNumbers);

      const matchCount = sumNumbers.length - setLotto.size;
      if (matchCount < 3) return;
      if (matchCount === 5) {
        if (lotto.includes(this.bonusNumber)) {
          return counter[6]++;
        }
        return counter[5]++;
      }
      if (matchCount === 6) return counter[7]++;
      counter[matchCount]++;
    });

    return counter;
  }

  calculateWinningRate(statistics, money) {
    const sum = Object.entries(statistics).reduce((acc, [key, count]) => {
      return acc + DEFINITION.LOTTO_PRISE[key] * count;
    }, 0);
    return (sum / money) * 100;
  }
}
