// TODO: 수익률 계산 기능 추가, 상수화

class Lotto {
  #numbers;
  #rank;
  #profit;

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

  #setRank(correctNumberCount, bonusNumber) {
    if (correctNumberCount === 5) return this.#setRankTwoOrThree(bonusNumber);
    if (correctNumberCount === 6) this.#rank = 1;
    if (correctNumberCount === 4) this.#rank = 4;
    if (correctNumberCount === 3) this.#rank = 5;
  }

  #isNumberIncluded(winningNumbers, lottoNumber) {
    return winningNumbers.includes(lottoNumber);
  }

  #setRankTwoOrThree(bonusNumber) {
    this.#rank = this.#numbers.includes(bonusNumber) ? 2 : 3;
  }
}

module.exports = Lotto;
