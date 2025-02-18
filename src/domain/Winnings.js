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
}
