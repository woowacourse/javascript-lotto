import LottoResultFactory from './LottoResultFactory.js';
export default class Lotto {
  #numbers = [];

  constructor(strategy) {
    this.pickStrategy = strategy;
  }

  get numbers() {
    return this.#numbers;
  }

  generate() {
    this.#numbers = this.pickStrategy.pickNumbers();
    return this;
  }

  generateGrade(winningNumbers, bonusNumber) {
    const numberOfMatches = this.#numbers.filter((number) =>
      winningNumbers.includes(number)
    ).length;

    const hasBonusNumber = this.#numbers.includes(bonusNumber);
    this.result = LottoResultFactory.createLottoResult(
      numberOfMatches,
      hasBonusNumber
    );
  }
}
