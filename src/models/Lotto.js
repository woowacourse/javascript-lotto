class Lotto {
  #numbers;

  constructor(lottoNumbers) {
    this.#numbers = lottoNumbers;
  }

  calculateMatchCount(winningNumbers) {
    return this.#numbers.reduce((acc, cur) => (acc += winningNumbers.includes(cur)), 0);
  }

  calculateRanking(matchCount, bonusNumber) {
    if (matchCount < 3) throw new Error('3 이상의 수를 입력해야 합니다.');

    if (matchCount === 6) return 1;
    if (matchCount === 5 && this.#numbers.includes(bonusNumber)) return 2;
    return 8 - matchCount;
  }
}

export default Lotto;
