import { correctCountPerRank, ranks } from '../../constants/constants';

export default class Lotto {
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
      Lotto.isNumberIncluded(winningNumbers, number)
    ).length;

    this.#setRank(correctNumberCount, bonusNumber);
  }

  #setRank(correctNumberCount, bonusNumber) {
    if (correctNumberCount === correctCountPerRank.SECOND_RANK) {
      this.#setRankTwoOrThree(bonusNumber);
      return;
    }
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

  static isNumberIncluded(winningNumbers, lottoNumber) {
    return winningNumbers.includes(lottoNumber);
  }
}
