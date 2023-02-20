const { correctCountPerRank, ranks } = require('../../constants/constants');

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
    if (correctNumberCount === correctCountPerRank.FIRST_RANK)
      this.#rank = ranks.FIRST_RANK;
    if (correctNumberCount === correctCountPerRank.FOURTH_RANK)
      this.#rank = ranks.FOURTH_RANK;
    if (correctNumberCount === correctCountPerRank.FIFTH_RANK)
      this.#rank = ranks.FIFTH_RANK;
  }

  #setRankTwoOrThree(bonusNumber) {
    this.#rank = this.#numbers.includes(bonusNumber)
      ? ranks.SECOND_RANK
      : ranks.THIRD_RANK;
  }
}

module.exports = Lotto;
