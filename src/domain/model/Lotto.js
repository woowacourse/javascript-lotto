const { CORRECT_COUNT_PER_RANK, RANK } = require('../../constants/constants');

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
    if (correctNumberCount === CORRECT_COUNT_PER_RANK.SECOND_RANK)
      return this.#setRankTwoOrThree(bonusNumber);
    if (correctNumberCount === CORRECT_COUNT_PER_RANK.FIRST_RANK)
      this.#rank = 1;
    if (correctNumberCount === CORRECT_COUNT_PER_RANK.FOURTH_RANK)
      this.#rank = 4;
    if (correctNumberCount === CORRECT_COUNT_PER_RANK.FIFTH_RANK)
      this.#rank = 5;
  }

  #setRankTwoOrThree(bonusNumber) {
    this.#rank = this.#numbers.includes(bonusNumber) ? RANK.SECOND : RANK.THIRD;
  }
}

module.exports = Lotto;
