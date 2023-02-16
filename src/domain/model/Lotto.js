const { correctCountPerRank } = require('../../constants/constants');

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
    if (correctNumberCount === correctCountPerRank.SECOND_RANK)
      return this.#setRankTwoOrThree(bonusNumber);
    if (correctNumberCount === correctCountPerRank.FIRST_RANK) this.#rank = 1;
    if (correctNumberCount === correctCountPerRank.FOURTH_RANK) this.#rank = 4;
    if (correctNumberCount === correctCountPerRank.FIFTH_RANK) this.#rank = 5;
  }

  #setRankTwoOrThree(bonusNumber) {
    this.#rank = this.#numbers.includes(bonusNumber) ? 2 : 3;
  }
}

module.exports = Lotto;
