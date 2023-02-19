export default class Lotto {
  #numbers;

  constructor(lottoNumbers) {
    this.#numbers = lottoNumbers;
  }

  getCompareResult(winningNumbers, bonusNumber) {
    const matchCount = this.getMatchCount(winningNumbers);
    const hasBonusNumber = this.hasBonusNumber(bonusNumber);

    return { matchCount, hasBonusNumber };
  }

  getMatchCount(winningNumbers) {
    return this.#numbers.filter((number) => winningNumbers.includes(number)).length;
  }

  hasBonusNumber(bonusNumber) {
    return this.#numbers.includes(bonusNumber);
  }

  getNumbers() {
    return this.#numbers;
  }
}
