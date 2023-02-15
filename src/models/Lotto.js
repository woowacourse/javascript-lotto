class Lotto {
  #numbers;

  constructor(lottoNumbers) {
    this.#numbers = lottoNumbers;
  }

  calculateRanking(winningNumbers, bonusNumber) {
    const matchCount = this.#numbers.reduce((acc, cur) => (acc += winningNumbers.includes(cur)));

    if (matchCount < 3) return 0;
    if (matchCount === 6) return 1;
    if (matchCount === 5 && this.#numbers.includes(bonusNumber)) return 2;
    return 8 - matchCount;
  }
}

export default Lotto;
