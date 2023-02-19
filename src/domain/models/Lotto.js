import { RANKING, RANKING_STANDARD, RANKING_THRESHOLD } from '../../constants';

class Lotto {
  #numbers;

  constructor(lottoNumbers) {
    this.#numbers = lottoNumbers;
  }

  getNumbers() {
    return this.#numbers;
  }

  calculateMatchCount(winningNumbers) {
    return this.#numbers.reduce((acc, cur) => (acc += winningNumbers.includes(cur)), 0);
  }

  calculateRanking(matchCount, bonusNumber) {
    if (matchCount < RANKING_THRESHOLD) throw new Error('3 이상의 수를 입력해야 합니다.');

    if (matchCount === RANKING_STANDARD.first) return RANKING.first;
    if (matchCount === RANKING_STANDARD.second && this.#numbers.includes(bonusNumber))
      return RANKING.second;
    return RANKING_STANDARD.benchmark - matchCount;
  }
}

export default Lotto;
