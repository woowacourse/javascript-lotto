const { calculateProfit } = require('../../utils');

class Lotto {
  #numbers;
  #rank;

  constructor(lottoNumbers) {
    this.#numbers = lottoNumbers;
  }

  getNumbers() {
    return this.#numbers;
  }

  getRank() {
    return this.#rank;
  }

  calculateRank(winningNumbers, bonusNumber) {
    const correctNumberCount = this.#numbers.filter((number) =>
      this.#isNumberIncluded(winningNumbers, number)
    ).length;

    this.#setRank(correctNumberCount, bonusNumber);
  }

  #isNumberIncluded(winningNumbers, lottoNumber) {
    return winningNumbers.includes(lottoNumber);
  }

  #setRank(correctNumberCount, bonusNumber) {
    if (correctNumberCount === 5) return this.#setRankTwoOrThree(bonusNumber);
    if (correctNumberCount === 6) this.#rank = 1;
    if (correctNumberCount === 4) this.#rank = 4;
    if (correctNumberCount === 3) this.#rank = 5;
  }

  #setRankTwoOrThree(bonusNumber) {
    this.#rank = this.#numbers.includes(bonusNumber) ? 2 : 3;
  }
}

module.exports = Lotto;
